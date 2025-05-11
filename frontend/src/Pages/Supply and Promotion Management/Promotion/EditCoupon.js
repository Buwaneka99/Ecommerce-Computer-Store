import { Button, DatePicker, Input } from "@nextui-org/react";
import Layout from "../../../Layout/Layout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, addDays, subDays } from "date-fns"; 

const formSchema = yup.object().shape({
  couponCode: yup
    .string()
    .required("Coupon code is required")
    .min(5, "Coupon code must be at least 5 characters long"),
  discount: yup.string().required("Discount is required"),
  expiryDate: yup
    .date()
    .required("Expire date is required")
    .typeError("Invalid date")
    .min(subDays(new Date(), 1), "Expiry date must be from today onwards")
    .max(addDays(new Date(), 60), "Expiry date cannot be more than 60 days from now"),
});

const EditCoupon = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = async (data) => {
    console.log("Form Data Before Sending:", data); // Check final form values
  
    try {
      await axios.put(`http://localhost:5000/coupon/${id}`, data);
      toast.success("Updated successfully");
      navigate("/dashboard/promotion/coupon/list");
    } catch (error) {
      console.log("Error Updating Coupon:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      const fetchCoupon = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/coupon/${id}`);
          const data = res.data;
  
          if (data.coupon) {
            const couponDate = new Date(data.coupon.expiryDate);
  
            // Format the date to YYYY-MM-DD for input[type="date"]
            const formattedDate = format(couponDate, "yyyy-MM-dd");
  
            reset({
              couponCode: data.coupon.couponCode,
              discount: data.coupon.discount,
              expiryDate: formattedDate,
            });
          }

          setIsLoaded(false);
        } catch (error) {
          setIsLoaded(false);
          console.log(error);
        }
      };
  
      fetchCoupon();
    }
  }, [id, reset]);
  

  if (isLoaded) {
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
            Edit Coupon
          </h1>
          <form
            className="mt-4 flex gap-2 flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              size="md"
              variant="filled"
              type="text"
              className="text-sm"
              label="Coupon Code"
              placeholder="Enter coupon code"
              {...register("couponCode")}
              isInvalid={errors.couponCode}
              errorMessage={errors.couponCode?.message}
              fullWidth
              autoFocus
            />
            <Input
              size="md"
              variant="filled"
              type="number"
              label="Discount ( percentage )"
              className="text-sm"
              placeholder="Enter discount"
              {...register("discount")}
              isInvalid={errors.discount}
              errorMessage={errors.discount?.message}
              fullWidth
            />
            <Controller
              name="expiryDate"
              control={control}
              defaultValue={selectedDate}
              render={({ field }) => (
                <Input
                  size="md"
                  variant="filled"
                  type="date"
                  label="Expire Date"
                  className="text-sm"
                  {...register("expiryDate")}
                  isInvalid={errors.expiryDate}
                  errorMessage={errors.expiryDate?.message}
                  fullWidth
                />
              )}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                size="large"
                className="bg-gray-500 text-white mt-2"
                onClick={() => navigate("/dashboard/promotion/coupon/list")}
              >
                Cancel
              </Button>
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

export default EditCoupon;
