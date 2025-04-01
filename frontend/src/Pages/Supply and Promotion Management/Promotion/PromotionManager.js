import { Link } from "react-router-dom";
import Layout from "../../../layout/Layout";
import promo from "../../../Assets/promo.png";
import coupon from "../../../Assets/coupon1.png";
import couponList from "../../../Assets/coupon.png";
import bg from "../../../Assets/TECHNOVA2.png";

const PromotionManager = () => {
  return (
    <Layout>
      <div
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-6 py-12"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="grid md:grid-cols-3 gap-12 w-full max-w-5xl mb-20">
          <Link
            to="/dashboard/promotion/items"
            className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg transition-all hover:scale-105 hover:shadow-teal-500/50 border border-teal-600 hover:bg-transparent/20"
          >
            <img src={promo} alt="Promotion Items" className="h-38 w-38 mb-6" />
            <span className="text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors">
              PROMOTION ITEMS
            </span>
          </Link>
          <Link
            to="/dashboard/promotion/coupon/add"
            className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg transition-all hover:scale-105 hover:shadow-teal-500/50 border border-teal-600 hover:bg-transparent/20"
          >
            <img src={coupon} alt="Add Coupon" className="h-38 w-38 mb-6" />
            <span className="text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors">
              ADD COUPON
            </span>
          </Link>
          <Link
            to="/dashboard/promotion/coupon/list"
            className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg transition-all hover:scale-105 hover:shadow-teal-500/50 border border-teal-600 hover:bg-transparent/20"
          >
            <img src={couponList} alt="Coupons" className="h-38 w-38 mb-6" />
            <span className="text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors">
              COUPONS
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PromotionManager;