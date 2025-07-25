import { Button, Input, Textarea } from "@nextui-org/react";
import Layout from "../../Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const formSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  supplierName: yup.string("Supplier name is required").required().min(3),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number must be at most 12 digits"),
  companyName: yup.string().required("Company name is required").min(3),
  address: yup.string().required("Address is required").min(3),
  supplyProduct: yup.string().required("Supply product is required").min(3),
});

const EditSupplier = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/supplies/${id}`, data);

      toast.success("Updated  successfully");

      navigate("/dashboard/supply/list");
    } catch (error) {
      if (error?.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/supplies/${id}`);
        const data = res.data;

        console.log(data);

        if (data?.supplier) {
          reset({
            supplierName: data.supplier.supplierName,
            companyName: data.supplier.companyName,
            email: data.supplier.email,
            phoneNumber: data.supplier.phoneNumber,
            supplyProduct: data.supplier.supplyProduct,
            address: data.supplier.address,
          });
        }else {
          console.error("Supplier data not found");
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSupplier();
  }, [id]);

  if (isLoading) {
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
      <div className="flex justify-center p-3 h-full items-center">
        <div className="w-[600px] border-2 px-10 py-5 rounded-lg">
          <h1 className="text-lg ml-2 font-semibold text-gray-800">
            Edit Supplier
          </h1>
          <form
            className="mt-4 flex gap-2 flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-5">
              {" "}
              <Input
                size="md"
                variant="filled"
                type="text"
                className="text-sm "
                label="Supplier Name"
                placeholder="Enter supplier name"
                {...register("supplierName")}
                isInvalid={errors.supplierName}
                errorMessage={errors.supplierName?.message}
              />
              <Input
                size="md"
                variant="filled"
                type="text"
                label="Company Name"
                className="text-sm"
                placeholder="Enter company name"
                {...register("companyName")}
                isInvalid={errors.companyName}
                errorMessage={errors.companyName?.message}
              />
            </div>
            <Input
              size="md"
              variant="filled"
              type="text"
              label="Email"
              className="text-sm "
              placeholder="Enter  email"
              {...register("email")}
              isInvalid={errors.email}
              errorMessage={errors.email?.message}
            />

            <Input
              label="Phone Number"
              placeholder="Enter Phone Number"
              variant="filled"
              type="number"
              errorMessage={errors.phoneNumber?.message}
              {...register("phoneNumber")}
              isInvalid={errors.phoneNumber}
            />

            <Input
              label="Supply Products"
              placeholder="Enter Supply Products"
              variant="filled"
              errorMessage={errors.supplyProduct?.message}
              {...register("supplyProduct")}
              isInvalid={errors.supplyProduct}
            />

            <Textarea
              label="Address"
              placeholder="Enter address"
              className="text-sm "
              {...register("address")}
              isInvalid={errors.address}
              errorMessage={errors.address?.message}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                size="large"
                className="bg-black text-white mt-2"
                loading={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );

};

export default EditSupplier;