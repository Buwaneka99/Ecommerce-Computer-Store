import Layout from "../Layout/Layout";
import bg from "../Assets/TECHNOVA2.png";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center flex-col h-full "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
      }}>
        <h1 className="text-3xl font-semibold text-blue-700">
          
        </h1>
      </div>
    </Layout>
  );
};
export default Dashboard;