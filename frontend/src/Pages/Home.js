import { useEffect, useState } from "react";
import Hero from "../Components/Hero";
const Home = () => {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Hero />
      <HeadLineCards 
      product={product}
      setLoading={setLoading} />
      <Promotions />
    </div>
  );
}