import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import axios from 'axios';


const Homepage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/products/");

      setProducts(response.data);
    }
    fetchProducts();

  }, []);


  return (
    <>
        <h2 className="text-3xl mx-4 my-10 text-white">All Product</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {
                products.map( (product) => {
                  return  <Product key={product._id} products={product} />
                })
            }
        </div>
    
    </>
  )
}

export default Homepage