import { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formSchema = yup.object().shape({
  employee: yup.string().required("Staff member is required"),
  basicSalary: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Basic salary is required")
    .positive("Basic salary must be a positive number"),
  allowances: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Allowances are required")
    .positive("Allowances must be a positive number"),
  ot: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("OT Hours are required")
    .min(0, "OT Hours cannot be negative"),
  otPay: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("OT Pay is required")
    .positive("OT Pay must be a positive number"),
  salary: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required("Salary is required")
    .positive("Salary must be a positive number"),
});

const CalculateSalary = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calculateSalary, setCalculateSalary] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      otPay: 180,
    },
  });

  const calculate = () => {
    const data = getValues();
    const basicSalary = parseFloat(data.basicSalary);
    const allowances = parseFloat(data.allowances);
    const ot = parseFloat(data.ot);
    const otPay = parseFloat(data.otPay);

    const otPayment = ot * otPay;
    const salary = basicSalary + allowances + otPayment;
    setCalculateSalary(salary);
    setValue("salary", salary);
  };

  const onSubmit = async (data) => {
    calculate();

    try {
      await axios.post("http://localhost:5000/salary", data);
      //   console.log(res.data);
      toast.success("Salary paid successfully");
      navigate("/dashboard/salary/list");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth");
        const data = await res.json();
        const staffList = data.users.filter((item) => item.role !== "user");
        setStaff(staffList);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaff();
  }, []);
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
      <div className="flex justify-center p-3 h-full items-center ">
        <div className="w-[600px] border-2 px-10 py-5 rounded-lg">
          <h1 className="text-lg ml-2 font-semibold text-gray-800">
            Calculate Salary
          </h1>
          <form
            className="mt-2 flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Select
              label="Staff Member Name"
              placeholder="Select Staff Member"
              variant="filled"
              className="flex-1"
              {...register("employee")}
              isInvalid={!!errors.employee}
              errorMessage={errors.employee?.message}
            >
              {staff.map((item, index) => (
                <SelectItem key={item.username} value={item.username}>
                  {item.username}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Basic Salary"
              placeholder="Enter Basic Salary"
              variant="filled"
              type="number"
              {...register("basicSalary")}
              isInvalid={!!errors.basicSalary}
              errorMessage={errors.basicSalary?.message}
            />
            <Input
              label="Allowances"
              placeholder="Enter Allowances"
              variant="filled"
              type="number"
              {...register("allowances")}
              isInvalid={!!errors.allowances}
              errorMessage={errors.allowances?.message}
            />
            <div className="flex gap-2">
              <Input
                label="1 Hour Payment"
                placeholder="Enter 1 Hour Rate"
                // variant="filled"
                type="number"
                value={getValues("otPay")}
                disabled
                color="secondary"
                {...register("otPay")}
                isInvalid={!!errors.otPay}
                errorMessage={errors.otPay?.message}
              />
              <Input
                label="OT Hours"
                placeholder="Enter OT Hours"
                variant="filled"
                type="number"
                {...register("ot")}
                isInvalid={!!errors.ot}
                errorMessage={errors.ot?.message}
              />
            </div>
            <Input
              label="Salary Payment"
              placeholder="Calculated Salary"
              type="number"
              disabled
              color="success"
              value={calculateSalary}
              {...register("salary")}
              isInvalid={!!errors.salary}
              errorMessage={errors.salary?.message}
            />
            <div className="flex justify-end gap-3">
              <Button
                onClick={calculate}
                size="large"
                className="bg-red-400 text-white mt-2"
                loading={isSubmitting}
              >
                Calculate Salary
              </Button>
              <Button
                size="large"
                className="bg-black text-white mt-2"
                type="submit"
              >
                Pay
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CalculateSalary;
