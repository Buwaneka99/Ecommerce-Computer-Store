import { MdDeleteSweep } from "react-icons/md";
import Layout from "../../../Layout/Layout";
import {
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  DatePicker,
} from "@nextui-org/react";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DeleteCouponModel from "./DeleteCouponModel";

const CouponList = () => {

  const [page, setPage] = useState(1);
  const [coupon, setCoupon] = useState([]);
  const [search, setSearch] = useState("");
  const [expirySearch, setExpirySearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [couponId, setCouponId] = useState("");
  const [refetch, setRefetch] = useState(false);

  const { isOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const rowsPerPage = 6;
  const pages = Math.ceil(coupon.length / rowsPerPage);

  const filteredCoupon = useMemo(() => {
    return coupon.filter((item) => {
      const matchesSearch = item.couponCode.toLowerCase().includes(search.toLowerCase()) ||
        item.discount.toString().includes(search);
      
      if (!expirySearch) return matchesSearch;
      
      const itemDate = new Date(item.expiryDate);
      const searchDate = new Date(expirySearch);
      
      return matchesSearch && 
        itemDate.getFullYear() === searchDate.getFullYear() &&
        itemDate.getMonth() === searchDate.getMonth() &&
        itemDate.getDate() === searchDate.getDate();
    });
  }, [search, expirySearch, coupon]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredCoupon?.slice(start, end);
  }, [page, filteredCoupon]);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const res = await fetch("http://localhost:5000/coupon");
        const data = await res.json();

        setCoupon(data.coupons);
        setLoading(false);
        setRefetch(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoupon();
  }, [refetch]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Coupon List Report", 14, 10);

    const tableColumn = ["ID", "Coupon Code", "discount", "expiry Date"];
    const tableRows = [];

    coupon.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.couponCode,
        item.discount,
        item.expiryDate,
      ];

      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("coupon-list-report.pdf");
  };

  const clearAllFilters = () => {
    setSearch("");
    setExpirySearch(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full items-center justify-center flex flex-col">
        <div className="flex justify-between p-2">
          <h1 className="text-center mt-2 font-semibold text-lg">
            Coupon List
          </h1>
        </div>
        <div className="flex w-[1000px] justify-between">
          <div className="flex items-center gap-4">
            <Input
              isClearable
              radius="full"
              placeholder="Search coupon..."
              startContent={<IoSearch />}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="w-[250px]"
            />
            <DatePicker
              label="Search by expiry date"
              value={expirySearch}
              onChange={setExpirySearch}
              className="w-[200px]"
              isClearable
            />
            <button
              className="bg-gray-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          </div>
          <button
            className="bg-blue-500 text-white px-4 text-sm rounded-lg"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        </div>
        <div className="min-w-[1000px] mt-2">
          <Table
            aria-label="Example table with pagination"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>Id</TableColumn>
              <TableColumn>Coupon Code</TableColumn>
              <TableColumn>Discount</TableColumn>
              <TableColumn>Expiry Date</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-gray-500 text-lg">No coupons found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                </div>
              }
            >
              {items.map((item, index) => {
                const date = new Date(item.expiryDate);

                const formattedDate = isNaN(date.getTime())
                  ? "Invalid date"
                  : date.toLocaleDateString("en-US");

                return (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.couponCode}</TableCell>
                    <TableCell>{item.discount}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell className="flex gap-6">
                      <Tooltip content="Edit coupon">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <FaUserEdit
                            onClick={() =>
                              navigate(
                                `/dashboard/promotion/coupon/edit/${item._id}`
                              )
                            }
                          />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete coupon">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <MdDeleteSweep
                            onClick={() => {
                              setCouponId(item._id);
                              onOpenChange();
                            }}
                          />
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <DeleteCouponModel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        couponId={couponId}
        setCouponId={setCouponId}
        setRefetch={setRefetch}
        setCoupon={setCoupon}
      />
    </Layout>
  );
};

export default CouponList;