import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeadLineCards from "../Components/HeadLineCards";
import Hero from "../Components/Hero";
import NavBar from "../Components/HomeNavBar";
import Promotions from "../Components/Promotions";
const Home = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, []);

  useEffect(() => {

    const fetchProduct = async () => {

      try {
        const res = await fetch("http://localhost:5000/products");

        const data = await res.json();

        setProduct(data.products);
        setLoading(false);
      } 
      catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    
    return (
      <div className="flex justify-center items-center  h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />
      <Hero />
      <HeadLineCards 
      product={product}
      setLoading={setLoading} />
      <Promotions />
    </div>
  );
};

export default Home;