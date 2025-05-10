import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Layout from "../../../Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { ProductCategory } from "../../../Data/productCatogory";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// High-quality tech/computer store background
const bgImgUrl = "https://images.unsplash.com/photo-1623282033815-40b05d96c903?auto=format&fit=crop&w=2070&q=80";

const formSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity cannot be a negative number"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be a negative number"),
  processor: yup.string().required("Processor is required"),
  os: yup.string().required("OS is required"),
  graphics: yup.string().required("Graphics is required"),
  storage: yup.string().required("Storage is required"),
});

const AddProduct = () => {
  const [imageBase64, setImageBase64] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!imageBase64) {
      return toast.error("Please upload an image");
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
      const res = await axios.post(
        "http://localhost:5000/products",
        productData
      );

      if (res.status === 201) {
        toast.success("Product added successfully");
        navigate("/dashboard/products/list");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      boxShadow: "0 0 25px rgba(20, 184, 255, 0.4)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(20, 184, 255, 0.6)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-cover bg-fixed bg-center relative py-10 px-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(3, 19, 43, 0.85)), url(${bgImgUrl})`,
        }}
      >
        {/* Decorative circuit lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
            
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20"></div>
            <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-blue-500/20 via-transparent to-blue-500/20"></div>
            <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-blue-500/20 via-transparent to-blue-500/20"></div>
            <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20"></div>
          </div>
        </div>

        {/* Floating tech icons */}
        <motion.div
          className="absolute top-20 right-10 text-blue-400/20 text-4xl"
          variants={floatingIconVariants}
          animate="animate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 7H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"/>
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-10 text-blue-400/20 text-4xl"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            <path d="M2.5 14.5A1.5 1.5 0 0 1 1 13V3a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 15 3v10a1.5 1.5 0 0 1-1.5 1.5h-11zM2 3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
          </svg>
        </motion.div>

        <div className="container mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent inline-block">
              Add New Product
            </h1>
            <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-2"></div>
            <p className="text-blue-300 mt-2">Enter your product details below</p>
          </motion.div>

          {/* Main form card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-blue-800/40"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column - Image Upload */}
                  <motion.div variants={itemVariants} className="flex-1">
                    <label className="block text-sm font-medium text-blue-300 mb-2">
                      Product Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      {!imageBase64 && (
                        <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-blue-600/30 border-dashed rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-800/60 hover:border-blue-500/60 transition-all duration-300">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <motion.div
                              initial={{ scale: 1 }}
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <svg
                                className="w-12 h-12 mb-4 text-blue-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                            </motion.div>
                            <p className="mb-2 text-sm text-blue-300">
                              <span className="font-semibold">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      )}

                      {imageBase64 && (
                        <div className="w-full h-80 border-2 border-blue-600/30 rounded-xl bg-gray-900/50 flex flex-col items-center justify-center overflow-hidden">
                          <motion.img
                            src={imageBase64}
                            alt="Selected File"
                            className="w-64 h-64 object-contain rounded-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 px-4 py-2 bg-blue-600/40 hover:bg-blue-600/60 rounded-md text-sm text-white"
                            onClick={() => setImageBase64(null)}
                          >
                            Change Image
                          </motion.button>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Right Column - Form Fields */}
                  <motion.div
                    variants={itemVariants}
                    className="flex-1 gap-6 flex flex-col"
                  >
                    {/* Product Name */}
                    <motion.div variants={itemVariants}>
                      <Input
                        size="lg"
                        type="text"
                        classNames={{
                          label: "text-blue-300",
                          input: "text-white",
                          inputWrapper: "bg-gray-800/50 border border-blue-800/40 shadow-md shadow-blue-900/20 focus-within:border-blue-500",
                        }}
                        label="Product Name"
                        placeholder="Enter product name"
                        {...register("productName")}
                        isInvalid={errors.productName}
                        errorMessage={errors.productName?.message}
                      />
                    </motion.div>

                    {/* Category */}
                    <motion.div variants={itemVariants}>
                      <Select
                        items={ProductCategory}
                        label="Product Category"
                        placeholder="Select product category"
                        classNames={{
                          label: "text-blue-300",
                          trigger: "bg-gray-800/50 border border-blue-800/40 text-white shadow-md shadow-blue-900/20 focus-within:border-blue-500",
                          listbox: "bg-gray-800 text-white border border-blue-800/60",
                        }}
                        {...register("category")}
                        isInvalid={errors.category}
                        errorMessage={errors.category?.message}
                      >
                        {ProductCategory.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.value}
                          </SelectItem>
                        ))}
                      </Select>
                    </motion.div>

                    {/* Quantity & Price */}
                    <motion.div variants={itemVariants} className="flex gap-4">
                      <Input
                        size="lg"
                        type="number"
                        classNames={{
                          label: "text-blue-300",
                          input: "text-white",
                          inputWrapper: "bg-gray-800/50 border border-blue-800/40 shadow-md shadow-blue-900/20 focus-within:border-blue-500",
                        }}
                        label="Quantity"
                        placeholder="Enter quantity"
                        {...register("quantity")}
                        isInvalid={errors.quantity}
                        errorMessage={errors.quantity?.message}
                      />
                      <Input
                        size="lg"
                        type="number"
                        classNames={{
                          label: "text-blue-300",
                          input: "text-white",
                          inputWrapper: "bg-gray-800/50 border border-blue-800/40 shadow-md shadow-blue-900/20 focus-within:border-blue-500",
                        }}
                        label="Price ($)"
                        placeholder="Enter price"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-blue-400">$</span>
                          </div>
                        }
                        {...register("price")}
                        isInvalid={errors.price}
                        errorMessage={errors.price?.message}
                      />
                    </motion.div>

                    {/* Processor & OS */}
                    <motion.div variants={itemVariants} className="flex gap-4">
                      <Input
                        size="lg"
                        type="text"
                        classNames={{
                          label: "text-blue-300",
                          input: "text-white",
                          inputWrapper: "bg-gray-800/50 border border-blue-800/40 shadow-md shadow-blue-900/20 focus-within:border-blue-500",
                        }}
                        label="Processor"
                        placeholder="e.g. Intel Core i7"
                        {...register("processor")}
                        isInvalid={errors.processor}
                        errorMessage={errors.processor?.message}
                      />
                      <Input
                        size="lg"
                        type="text"
                        classNames={{
                          label: "text-blue-300",
                          input: "text-white",
                          inputWrapper: "bg-gray-800/50 border border-blue-800/40 shadow-md shadow-blue-900/20 focus-within:border-blue-500",
                        }}
                        label="Operating System"
                        placeholder="e.g. Windows 11"
                        {...register("os")}
                        isInvalid={errors.os}
                        errorMessage={errors.os?.message}
                      />
                    </motion.div>

                    {/* Graphics & Storage */}
                    <motion.div variants={itemVariants} className="flex gap-4">
                      <Input
                        size="lg"
                        type="text"
                        classNames={{
                          label: "text-blue-300",
                          input: "text-white",
                          inputWrapper: "bg-gray-800/50 border border-blue-800/40 shadow-md shadow-blue-900/20 focus-within:border-blue-500",
                        }}
                        label="Graphics"
                        placeholder="e.g. NVIDIA GeForce RTX 4070"
                        {...register("graphics")}
                        isInvalid={errors.graphics}
                        errorMessage={errors.graphics?.message}
                      />
                      <Input
                        size="lg"
                        type="text"
                        classNames={{
                          label: "text-blue-300",
                          input: "text-white",
                          inputWrapper: "bg-gray-800/50 border border-blue-800/40 shadow-md shadow-blue-900/20 focus-within:border-blue-500",
                        }}
                        label="Storage"
                        placeholder="e.g. 1TB SSD"
                        {...register("storage")}
                        isInvalid={errors.storage}
                        errorMessage={errors.storage?.message}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.div
                  variants={buttonVariants}
                  className="flex justify-end mt-6"
                >
                  <motion.button
                    type="submit"
                    whileHover="hover"
                    whileTap="tap"
                    className={`px-8 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600"
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Add Product
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                          />
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Tech decorative elements */}
          <div className="absolute bottom-4 right-4 opacity-20">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20V18H4V6Z" stroke="#4B9FFF" strokeWidth="0.5"/>
              <path d="M8 6V18" stroke="#4B9FFF" strokeWidth="0.5"/>
              <path d="M16 6V18" stroke="#4B9FFF" strokeWidth="0.5"/>
              <circle cx="12" cy="12" r="2" stroke="#4B9FFF" strokeWidth="0.5"/>
              <circle cx="12" cy="12" r="5" stroke="#4B9FFF" strokeWidth="0.5"/>
            </svg>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;