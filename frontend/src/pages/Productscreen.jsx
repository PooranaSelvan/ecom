import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailQuery } from '../slices/productSlice';
import { addCart } from '../slices/cartSlice';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, error, isLoading } = useGetProductDetailQuery(productId);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addCart({ ...product, qty }));
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="loading loading-spinner loading-lg"></div></div>;
  if (error) return <div className="alert alert-error">{error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="btn btn-ghost mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Go back
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center bg-base-200 rounded-lg p-4">
          <img className="h-[450px] w-full object-contain rounded-lg shadow-lg" src={`${product.image}`} alt={product.name} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-4">{product.name}</h2>
              <p className="text-lg mb-4">{product.description}</p>
              
              <div className="flex items-center mb-4">
                <Rating value={product.rating} text={product.numReviews} />
              </div>

              <div className="stats shadow mb-4">
                <div className="stat">
                  <div className="stat-title">Price</div>
                  <div className="stat-value text-primary">${product.price}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Stock Status</div>
                  <div className={`stat-value ${product.countInStock > 0 ? 'text-success' : 'text-error'}`}>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
              </div>

              {product.countInStock > 0 && (
                <>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Quantity:</span>
                    </label>
                    <select 
                      className="select select-bordered w-full max-w-xs" 
                      onChange={(e) => setQty(Number(e.target.value))}
                      value={qty}
                    >
                      {[...Array(product.countInStock).keys()].map((stock) => (
                        <option key={stock + 1} value={stock + 1}>
                          {stock + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="card-actions">
                    <button onClick={addToCartHandler} className="btn btn-primary btn-block">
                      Add to cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;