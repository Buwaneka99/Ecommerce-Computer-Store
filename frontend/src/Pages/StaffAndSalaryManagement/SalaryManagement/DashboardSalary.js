import { Link } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import calcsal from "../../../Assets/calcsal1.png";
import salaryList from "../../../Assets/salaryList1.png";
import bg from "../../../Assets/TECHNOVA2.png";

const DashboardSalary = () => {
  return (
    <Layout>
      <div className="flex flex-wrap items-center justify-center h-full min-h-full p-10 gap-28"
      style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backdropFilter: "blur(10px)",
              }}
      >
        <Link
          to="/dashboard/salary/add"
            className="flex flex-col items-center justify-center transition-all border border-teal-600 shadow-lg group bg-white/10 backdrop-blur-md rounded-2xl hover:scale-105 hover:shadow-teal-500/50 hover:bg-transparent/20 "
          >
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <img src={calcsal} alt="profile" className="h-25 w-25" />
            <span className="mb-6 text-2xl font-semibold text-white transition-colors group-hover:text-teal-300">
              CALCULATE SALARY
            </span>
          </div>
        </Link>
        <Link
          to="/dashboard/salary/list"
          className="flex flex-col items-center justify-center transition-all border border-teal-600 shadow-lg group bg-white/10 backdrop-blur-md rounded-2xl hover:scale-105 hover:shadow-teal-500/50 hover:bg-transparent/20 "
          >
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <img src={salaryList} alt="profile" className="h-25 w-25" />
            <span className="mb-6 text-2xl font-semibold text-white transition-colors group-hover:text-teal-300">
              SALARY PAYMENTS
            </span>
          </div>
        </Link>
      </div>
    </Layout>
  );
};
export default DashboardSalary;
