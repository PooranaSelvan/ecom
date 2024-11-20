import React, { useState, useEffect } from 'react'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productSlice'
import Loader from "../components/Loader";

const Homepage = () => {
  // getting product data from redux store
  const { data: products, error, isLoading } = useGetProductsQuery();

  // loading animation
  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-100 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error.toString()}</span>
      </div>
    )
  }

  return (
    <div className="dark:bg-gray-900 transition-colors duration-300">
      <div className="px-4 py-8 pt-28">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">All Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product._id} products={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage