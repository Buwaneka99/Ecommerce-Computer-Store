import { Link } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import calcsal from "../../../Assets/calcsal1.png";
import salaryList from "../../../Assets/salaryList1.png";
import bg from "../../../Assets/TECHNOVA2.png";

const DashboardSalary = () => {
  return (
    <Layout>
      <div className="flex flex-wrap justify-center gap-28  p-10 h-full items-center min-h-full"
      style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backdropFilter: "blur(10px)",
              }}
      >
        <Link
          to="/dashboard/salary/add"
            className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl  shadow-lg transition-all hover:scale-105 hover:shadow-teal-500/50 border border-teal-600 hover:bg-transparent/20 "
          >
          <div className="flex  justify-center items-center h-full flex-col gap-6">
            <img src={calcsal} alt="profile" className="h-25 w-25" />
            <span className="text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors mb-6">
              CALCULATE SALARY
            </span>
          </div>
        </Link>
        <Link
          to="/dashboard/salary/list"
          className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl  shadow-lg transition-all hover:scale-105 hover:shadow-teal-500/50 border border-teal-600 hover:bg-transparent/20 "
          >
          <div className="flex justify-center items-center h-full flex-col gap-6">
            <img src={salaryList} alt="profile" className="h-25 w-25" />
            <span className="text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors mb-6">
              SALARY PAYMENTS
            </span>
          </div>
        </Link>
      </div>
    </Layout>
  );
};
export default DashboardSalary;
