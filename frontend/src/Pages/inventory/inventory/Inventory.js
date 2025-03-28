import { Link } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import addProduct from "../../../Assets/add-product.png";
import listProduct from "../../../Assets/procurement.png";
import bg from "../../../Assets/TECHNOVA2.png";

const Inventory = () => {
  return (
    <Layout>
      <div
        className="min-h-[calc(100vh-20px)] flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-6 py-12"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl mb-20">
          <Link
            to="/dashboard/products/add"
            className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg transition-all hover:scale-105 hover:shadow-teal-500/50 border border-teal-600 hover:bg-transparent/20"
          >
            <img src={addProduct} alt="Add Product" className="h-38 w-38 mb-6" />
            <span className="text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors">
              ADD PRODUCT
            </span>
          </Link>
          <Link
            to="/dashboard/products/list"
            className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg transition-all hover:scale-105 hover:shadow-teal-500/50 border border-teal-600 hover:bg-transparent/20"
          >
            <img src={listProduct} alt="Product List" className="h-38 w-38 mb-6" />
            <span className="text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors">
              PRODUCT LIST
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;
