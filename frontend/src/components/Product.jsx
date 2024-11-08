import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ products }) => {
  return (
    <Link to={`/product/${products._id}`} className="block transition-transform hover:scale-105">
      <div className="card bg-gray-800 shadow-xl mb-4 mx-4 text-[#DBD8E3] overflow-hidden" id={`${products._id}`}>
        <figure className="relative pb-[56.25%]">
          <img src={`${products.image}`} alt={products.name} className="absolute top-0 left-0 w-full h-full object-cover"/>
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-xl font-bold mb-2 line-clamp-1">{products.name}</h2>
          <div className="flex items-center mb-2">
            <Rating value={products.rating} text={products.numReviews} />
          </div>
          <p className="text-2xl font-semibold text-primary mb-2">${products.price}</p>
          <p className="text-sm line-clamp-2 text-gray-400">{products.description}</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary btn-sm">View Details</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;