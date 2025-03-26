import React, { useEffect, useState } from "react";
import NavBar from "../Components/HomeNavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfilePic from "../Assets/gamer.png";
import ReactStars from "react-rating-stars-component";

const ProductPage = () => {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  const handleAddClick = (product) => {
    const sanitizedProduct = {
      _id: product._id,
      name: product.productName,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
      selectedQuantity: 1,
      discount: product.discount,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product._id
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].selectedQuantity += 1;
    } else {
      cart.push(sanitizedProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate(`/cart`);
  };
  
  console.log("feed", feedbacks);

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        const data = res.data.product;
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/feedback`);
        const data = await res.json();
        setFeedbacks(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className=" max-w-[1400px] p-4 mx-auto mt-[50px] mb-[150px]">
        <div className="  flex justify-between">
          <div className="mr-5   w-full">
            {product?.discount !== 0 ? (
              <div className="bg-red-600 rounded-full  w-[100px] h-[100px] flex items-center justify-center text-4xl font-bold">
                {product?.discount}%
              </div>
            ) : null}
            <img
              className=" w-full object-cover rounded-xl"
              src={product?.image}
              alt="product"/>
          </div>

          <div className="h-auto border-l-2 border-gray-300"></div>

          <div className="  ml-5 w-full mt-[50px]">

            <div className=" p-3">
              
              <div className=" font-bold flex  mb-10">
                <p className=" text-4xl">{product?.productName}</p>
              </div>
              
              <div className=" p-4 ">
                <div className=" flex mb-3 gap-x-2">
                  {/* Row 1 */}
                  <div className="mr-2">
                    <img
                      width="25"
                      height="25"
                      src="https://img.icons8.com/quill/50/processor.png"
                      alt="processor"
                      className=""
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="">
                    <span className=" text-lg ">{product?.processor}</span>
                  </div>
                </div>

                <div className=" flex gap-x-2  mb-3">
                  {/* Row 1 */}
                  <div className="mr-2">
                    <img
                      width="25"
                      height="25"
                      src="https://img.icons8.com/comic/100/hdd.png"
                      alt="hdd"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="">
                    <span className=" text-lg ">{product?.os}</span>
                  </div>
                </div>

                <div className=" flex gap-x-2  mb-3">
                  {/* Row 1 */}
                  <div className="mr-2">
                    <img
                      width="22"
                      height="22"
                      src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-graphic-card-computers-dreamstale-lineal-dreamstale.png"
                      alt="external-graphic-card-computers-dreamstale-lineal-dreamstale"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="">
                    <span className=" text-lg ">{product?.graphics}</span>
                  </div>
                </div>

                <div className=" flex gap-x-2  mb-3">
                  {/* Row 1 */}
                  <div className="mr-2">
                    <img
                      width="23"
                      height="23"
                      src="https://img.icons8.com/external-prettycons-lineal-prettycons/49/external-ram-technology-prettycons-lineal-prettycons.png"
                      alt="external-ram-technology-prettycons-lineal-prettycons"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="">
                    <span className=" text-lg ">
                      64 GB: 2 x 32 GB, DDR5, 5200 MT/s
                    </span>
                  </div>
                </div>

                <div className=" flex gap-x-2  mb-3">
                  {/* Row 1 */}
                  <div className="mr-2">
                    <img
                      width="23"
                      height="23"
                      src="https://img.icons8.com/ios/50/ssd.png"
                      alt="ssd"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="">
                    <span className=" text-lg ">{product?.storage} </span>
                  </div>
                </div>
              </div>
              {product?.discount > 0 ? (
                <div>
                  <span className="line-through">
                    LKR.
                    {product?.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="text-orange-600 text-2xl">
                    LKR.
                    {(
                      product?.price -
                      (product?.price * product?.discount) / 100
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                ) : (
                  <div>
                    <span className="text-2xl font-bold">
                      LKR.
                      {product?.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
              )}
              <button
                onClick={
                  product?.quantity > 0
                    ? () => handleAddClick(product)
                    : () => alert("Out of Stock")
                }
                className="mx-2 font-semibold bg-green-600 bottom-4  text-white mt-10 hover:scale-105 duration-100 border border-white rounded-xl px-5 py-3 hover:text-black"
              >
                Add to Cart
              </button>            
            </div>
          </div>
        </div>
        
        <hr className=" border-2-2 mt-3 mb-3" />
        <h1 className=" text-2xl font-semibold">Feedback</h1>
        {feedbacks?.map((feedback, index) => {
          const productFeedbacks = feedback?.order?.orderItems.filter(
            (item) => item._id === id
          );

          if (productFeedbacks?.length === 0) return null;

          return (
            <div key={index} className="grid grid-cols-3  gap-4">
              {productFeedbacks?.map((productFeedback, subIndex) => (
                <div
                  key={subIndex}
                  className=" flex gap-2 items-center justify-center border-b"
                >
                  <div className="w-[60px] h-[50px]">
                    <img
                      src={ProfilePic}
                      alt="Profile"
                      className=" object-cover rounded-full"
                    />
                  </div>

                  <div className="w-full  rounded-lg p-4 bg-slate-200 mt-2">
                    <p className=" text-lg font-semibold">
                      {feedback.user.username}
                    </p>
                    <p className=" first-letter:capitalize">
                      {feedback.feedback}
                    </p>
                    <ReactStars
                      size={30}
                      edit={false}
                      value={feedback.rating}
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductPage;