import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';




const ProductScreen = () => {

  const { id: productId } = useParams();
  const [product, setProduct] = useState({});


  useEffect(() => {

    const fetchProduct = async () => {

      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProduct(response.data);

    }

    fetchProduct();

  }, [productId]);




  return (
    <div className='mt-4 mx-4'>
      <Link to="/">
        <button className="btn btn-accent">Go back</button>
      </Link>

      <div className='grid md:grid-cols-2 gap-10 mt-10 text-[#DBD8E3]'>
        <div className='md:grid-cols-6'>
          <img className="h-[500px] w-full rounded-lg" src={`${product.image}`} alt="Product Image" />
        </div>
        <div className='md:grid-cols-6'>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              
              <div className='flex'>
                 <Rating value={product.rating} text={product.numReviews}/>
                 
              </div>

              <p>Price {product.price}</p>
              <p>{product.countInStock > 0 ? "In stock" : "No stock"}</p>

              <div className="card-actions">
                <button className="btn btn-secondary">Add to cart</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductScreen