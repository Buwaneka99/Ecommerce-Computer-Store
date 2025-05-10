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
} from "@nextui-org/react";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DeleteProductModel from "./DeleteProductModel";
import MessageToSupplierModal from "./MessageToSupplierModal";
import { motion } from "framer-motion";

// High-quality warehouse/inventory background
const bgImgUrl = "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2070&q=80";

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [clickedProductName, setClickedProductName] = useState("");
  const { isOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenMessage, onOpenChange: onOpenChangeMessage } =
    useDisclosure();

  const navigate = useNavigate();
  const rowsPerPage = 4;
  const pages = Math.ceil(product.length / rowsPerPage);

  const filteredStaff = useMemo(() => {
    return product.filter((item) =>
      item.productName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, product]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredStaff?.slice(start, end);
  }, [page, filteredStaff]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        setProduct(data.products);
        setLoading(false);
        setRefetch(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaff();
  }, [refetch]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Product List", 14, 10);
    const tableColumn = ["Id", "Product Name", "Category", "Quantity", "Price"];
    const tableRows = [];

    product.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.productName,
        item.category,
        item.quantity,
        item.price,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("product-list-report.pdf");
  };

  if (loading) {
    return (
      <Layout>
        <div 
          className="flex justify-center items-center h-screen w-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImgUrl})`,
          }}
        >
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-b-4"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div 
        className="min-h-screen w-full bg-fixed bg-cover bg-center py-12 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${bgImgUrl})`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-2xl max-w-7xl mx-auto p-8 text-white shadow-2xl backdrop-blur-sm border border-gray-700/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Product Inventory</h1>
            </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-500/20"
              onClick={generatePDF}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
          
          <div className="mb-6">
            <Input
              isClearable
              radius="lg"
              placeholder="Search product..."
              startContent={<IoSearch className="text-gray-400" />}
              onChange={(e) => setSearch(e.target.value)}
              classNames={{
                input: "text-gray-100",
                inputWrapper: "bg-gray-800/80 border border-gray-700/50 shadow-lg",
              }}
              size="lg"
            />
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-gray-700/50 shadow-xl">
            <Table
              isStriped
              aria-label="Product table"
              classNames={{
                wrapper: "rounded-xl shadow-md",
                table: "bg-gray-900/90 text-gray-100",
                td: "border-b border-gray-800",
                th: "bg-gray-800/90 text-gray-200 font-bold",
                thead: "rounded-t-xl overflow-hidden",
              }}
              bottomContent={
                pages > 0 ? (
                  <div className="flex w-full justify-center py-4">
                    <Pagination
                      showControls
                      color="primary"
                      page={page}
                      total={pages}
                      onChange={(page) => setPage(page)}
                      classNames={{
                        cursor: "bg-blue-600",
                      }}
                    />
                  </div>
                ) : null
              }
            >
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>PRODUCT NAME</TableColumn>
                <TableColumn>IMAGE</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>QUANTITY</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No products found">
                {items.map((item, index) => (
                  <TableRow key={item._id} className="hover:bg-gray-800/50 transition-colors">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium text-blue-400">{item.productName}</TableCell>
                    <TableCell>
                      <div className="relative w-16 h-16 overflow-hidden rounded-lg border-2 border-gray-700 shadow-lg">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image" }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-bold ${item.quantity < 10 ? 'text-red-400' : 'text-green-400'}`}>
                        {item.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold">${item.price}</TableCell>
                    <TableCell>
                      <div className="flex gap-4 items-center">
                        <Tooltip content="Edit product" color="primary">
                          <button className="text-xl text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-blue-900/30">
                            <FaUserEdit
                              onClick={() =>
                                navigate(`/dashboard/products/edit/${item._id}`)
                              }
                            />
                          </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete product">
                          <button className="text-xl text-red-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-900/30">
                            <MdDeleteSweep
                              onClick={() => {
                                setProductId(item._id);
                                onOpenChange();
                              }}
                            />
                          </button>
                        </Tooltip>
                        <Tooltip color="success" content="Notify Supplier">
                          <button className="text-xl text-green-400 hover:text-green-300 transition-colors p-2 rounded-full hover:bg-green-900/30">
                            <BiMessageRoundedDetail
                              onClick={() => {
                                setClickedProductName(item.productName);
                                onOpenChangeMessage();
                              }}
                            />
                          </button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredStaff.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg">No products found matching your search</p>
            </div>
          )}
        </motion.div>
      </div>
      <DeleteProductModel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        productId={productId}
        setProductId={setProductId}
        setRefetch={setRefetch}
        setProduct={setProduct}
      />
      <MessageToSupplierModal
        isOpen={isOpenMessage}
        onOpenChange={onOpenChangeMessage}
        setRefetch={setRefetch}
        clickedProductName={clickedProductName}
      />
    </Layout>
  );
};

export default ProductsList;