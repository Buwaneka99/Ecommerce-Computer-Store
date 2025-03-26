import React from "react";
import { Link } from "react-router-dom";
import cardbg from "../assets/cardbg.png";
function HeadLineCards({ setLoading, product }) {

  return (

    <div className="max-w-[1640px] mx-auto p-4 py-6 grid md:grid-cols-4 gap-6 bg-stone-950">
      {/* card */}
      {product.map((p, index) => {
        return (
          <Link
            to={`/product/${p._id}`}
            key={index}
            className="rounded-xl relative hover:scale-105 duration-300  border-orange-950 hover:cursor-pointer border "
            style={{
              backgroundImage: `url(${cardbg})`, // Set the background image
              backgroundSize: "cover",           // Ensure the image covers the card
              backgroundPosition: "center",      // Center the background image
            }}            
          >

          {/* Product Info Section */}
          <div className="p-4 bg-black/50 rounded-xl shadow-lg text-white">
           {/* Product Name */}
            <p className="font-bold text-center text-2xl">{p.productName}</p>

            {/* Product Image */}
            <div className="my-4">
              <img
                src={p.image}
                alt={p.productName}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Price */}
            <div className="bg-black p-2 rounded-lg border-orange-900 hover:cursor-pointer border hover:scale-105 duration-300">
                <p className="text-white text-center font-semibold">
                  LKR.{" "}
                  {p.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              {/* Order Now Button */}
              <div className="mt-4 flex justify-center">
                <button className="bg-black text-orange-500 font-bold rounded-lg px-6 py-2 transform transition-all hover:bg-orange-600 border-orange-900 hover:cursor-pointer border hover:scale-105 duration-300 hover:text-black">
                  Order Now
                </button>
              </div>
          </div>
          </Link>

        )
      })}
    </div>

  )
};

export default HeadLineCards;