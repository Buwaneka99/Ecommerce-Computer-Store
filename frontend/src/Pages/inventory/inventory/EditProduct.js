import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Layout from "../../../Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { ProductCategory } from "../../../Data/productCatogory";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiUpload, FiX, FiSave } from "react-icons/fi";
import { motion } from "framer-motion";

const formSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  processor: yup.string().required("Processor is required"),
  os: yup.string().required("OS is required"),
  graphics: yup.string().required("Graphics is required"),
  storage: yup.string().required("Storage is required"),
});

const EditProduct = () => {
  const [imageBase64, setImageBase64] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        const data = res.data.product;
        setProduct(data);
        if (data) {
          reset({
            productName: data.productName,
            category: data.category,
            quantity: data.quantity,
            price: data.price,
            processor: data.processor,
            os: data.os,
            graphics: data.graphics,
            storage: data.storage,
          });
          setImageBase64(data.image);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data) => {
    if (!imageBase64) {
      toast.error("Please upload an image");
      return;
    }

    const productData = {
      productName: data.productName,
      category: data.category,
      quantity: data.quantity,
      price: data.price,
      processor: data.processor,
      os: data.os,
      graphics: data.graphics,
      storage: data.storage,
      image: imageBase64,
    };

    try {
      await axios.put(`http://localhost:5000/products/${id}`, productData);
      toast.success("Product updated successfully");
      navigate("/dashboard/products/list");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageBase64(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageBase64(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h1 className="text-2xl font-bold text-white">Edit Product</h1>
              <p className="text-gray-300 mt-1">
                Update the details of your product
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Upload Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Product Image
                    </label>
                    {!imageBase64 ? (
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-700/80 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUpload className="w-10 h-10 mb-3 text-gray-300" />
                          <p className="mb-2 text-sm text-gray-300">
                            <span className="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">
                            PNG, JPG (MAX. 2MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={imageBase64}
                          alt="Product preview"
                          className="w-full h-64 object-contain rounded-lg border border-gray-600 bg-gray-700"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                          aria-label="Remove image"
                        >
                          <FiX className="text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields Section */}
                <div className="space-y-4">
                  <Input
                    label="Product Name"
                    variant="bordered"
                    size="sm"
                    classNames={{
                      label: "text-gray-300 font-medium",
                      input: "text-white",
                      inputWrapper: "border-gray-600 bg-gray-700",
                    }}
                    {...register("productName")}
                    isInvalid={!!errors.productName}
                    errorMessage={errors.productName?.message}
                  />

                  <Select
                    label="Product Category"
                    variant="bordered"
                    size="sm"
                    classNames={{
                      label: "text-gray-300 font-medium",
                      trigger: "border-gray-600 bg-gray-700",
                      value: "text-white",
                    }}
                    {...register("category")}
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message}
                  >
                    {ProductCategory.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="text-white bg-gray-800 hover:bg-gray-700"
                      >
                        {item.value}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Quantity"
                      type="number"
                      variant="bordered"
                      size="sm"
                      classNames={{
                        label: "text-gray-300 font-medium",
                        input: "text-white",
                        inputWrapper: "border-gray-600 bg-gray-700",
                      }}
                      {...register("quantity")}
                      isInvalid={!!errors.quantity}
                      errorMessage={errors.quantity?.message}
                    />
                    <Input
                      label="Price ($)"
                      type="number"
                      variant="bordered"
                      size="sm"
                      classNames={{
                        label: "text-gray-300 font-medium",
                        input: "text-white",
                        inputWrapper: "border-gray-600 bg-gray-700",
                      }}
                      {...register("price")}
                      isInvalid={!!errors.price}
                      errorMessage={errors.price?.message}
                    />
                  </div>

                  <Input
                    label="Processor"
                    variant="bordered"
                    size="sm"
                    classNames={{
                      label: "text-gray-300 font-medium",
                      input: "text-white",
                      inputWrapper: "border-gray-600 bg-gray-700",
                    }}
                    {...register("processor")}
                    isInvalid={!!errors.processor}
                    errorMessage={errors.processor?.message}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Operating System"
                      variant="bordered"
                      size="sm"
                      classNames={{
                        label: "text-gray-300 font-medium",
                        input: "text-white",
                        inputWrapper: "border-gray-600 bg-gray-700",
                      }}
                      {...register("os")}
                      isInvalid={!!errors.os}
                      errorMessage={errors.os?.message}
                    />
                    <Input
                      label="Graphics"
                      variant="bordered"
                      size="sm"
                      classNames={{
                        label: "text-gray-300 font-medium",
                        input: "text-white",
                        inputWrapper: "border-gray-600 bg-gray-700",
                      }}
                      {...register("graphics")}
                      isInvalid={!!errors.graphics}
                      errorMessage={errors.graphics?.message}
                    />
                  </div>

                  <Input
                    label="Storage"
                    variant="bordered"
                    size="sm"
                    classNames={{
                      label: "text-gray-300 font-medium",
                      input: "text-white",
                      inputWrapper: "border-gray-600 bg-gray-700",
                    }}
                    {...register("storage")}
                    isInvalid={!!errors.storage}
                    errorMessage={errors.storage?.message}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <Button
                  type="button"
                  onClick={() => navigate("/dashboard/products/list")}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-medium"
                  startContent={<FiX size={18} />}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium"
                  isLoading={isSubmitting}
                  startContent={!isSubmitting && <FiSave size={18} />}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default EditProduct;