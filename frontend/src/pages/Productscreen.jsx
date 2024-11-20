import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductDetailQuery } from '../slices/productSlice';
import { useAddToCartMutation } from '../slices/cartSlice';
import Rating from '../components/Rating';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify'
import Loader from "../components/Loader";

const ProductScreen = () => {

  // redux data
  const { id: productId } = useParams();
  const { data: product, error, isLoading } = useGetProductDetailQuery(productId);
  const [addToCart] = useAddToCartMutation();

  const [qty, setQty] = useState(1);

  const addToCartHandler = async () => {
    try {
      // calling redux func to add to db
      await addToCart({ productId, qty }).unwrap();
      toast.success("Item added to cart successfully!");
    } catch (err) {
      toast.error("Failed to add item to cart:", err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) return (
    <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-100 px-4 py-3 rounded relative" role="alert">
      {error.message}
    </div>
  );

  return (
    <div className="px-4 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">

      <Link to="/" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 mb-6 mt-20">
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-lg">Go back</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <img className="max-w-full max-h-[450px] object-contain rounded-lg shadow-lg" src={product.image} alt={product.name}/>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{product.name}</h2>
            <p className="text-base md:text-lg mb-4 text-gray-600 dark:text-gray-400">{product.description}</p>

            <div className="flex items-center mb-4">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Price</div>
                <div className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">${product.price}</div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Stock Status</div>
                <div className={`text-xl md:text-2xl font-bold ${product.countInStock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>

            </div>

            {product.countInStock > 0 && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="quantity">
                    Quantity:
                  </label>
                  <select id="quantity" className="mt-1 shadow-xl block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" onChange={(e) => setQty(Number(e.target.value))} value={qty}>
                    {[...Array(product.countInStock).keys()].map((stock) => (
                      <option key={stock + 1} value={stock + 1}>
                        {stock + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button onClick={addToCartHandler} className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Add to cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;