import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ products }) => {
  return (
    <Link to={`/product/${products._id}`} className="block transition-transform hover:scale-105">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg  shadow-gray-500 dark:shadow-gray-800 hover:shadow-gray-700 overflow-hidden mb-4 mx-4" id={`${products._id}`}>
        <div className="relative pb-[56.25%]">
          <img src={`${products.image}`} alt={products.name} className="absolute top-0 left-0 w-full h-full object-cover"/>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 truncate">
            {products.name}
          </h2>
          <div className="flex items-center mb-2 text-gray-800 dark:text-gray-200">
            <Rating value={products.rating} text={products.numReviews} />
          </div>
          <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            ${products.price}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {products.description}
          </p>
          <div className="mt-4 flex justify-end">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;