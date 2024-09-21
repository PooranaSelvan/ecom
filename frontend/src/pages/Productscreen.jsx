import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useGetProductDetailQuery } from '../slices/productSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux'; // dispatch is used to update the actions [An action is an object that describes what happened in the application (e.g., a user clicked a button, data was fetched, etc.). ]
import { addCart } from '../slices/cartSlice';


const ProductScreen = () => {

  // intha productId namma useParams vachu get panrom anga product la link la podura id
  const { id: productId } = useParams();

  const { data:product, error, isLoading } = useGetProductDetailQuery(productId);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  // ithu addToCart ithu vanthu cart la add panna use aagum
  const addToCartHandler = () => {
    dispatch(addCart({...product, qty})); // ithula dispatch vachu addCart ooda action aa update panrom [products aa spread panni athula namaku kedacha qty uhm oru object la add panrom antha obj aa dispatch panrom]
  }

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>{error.message}</p>

  return (
    <div className='mt-4 mx-4'>
      <Link to="/">
        <button className="btn btn-accent">Go back</button>
      </Link>

      <div className='grid md:grid-cols-2 gap-10 md:mt-10'>
        <div className='flex justify-center items-center'>
          <img className="h-[450px] w-full object-contain rounded-2xl" src={`${product.image}`} alt="Product Image" />
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
              <p className='font-bold'>{product.countInStock > 0 ? "In stock" : "No stock Left.."}</p>

              {product.countInStock > 0 ? 
              <>
              <div className='my-4'>
                <p>Quantity:</p>
                <select name='dropdown' className="select select-bordered w-full max-w-xs" onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((stock) => ( 
                      <option key={stock + 1}>{stock + 1}</option>
                    ))}
                </select>
              </div>

              <div className="card-actions">
                <button onClick={addToCartHandler} className="btn btn-secondary">Add to cart</button>
              </div>     
              </>
                : null
              }

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductScreen