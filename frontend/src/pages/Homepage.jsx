import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productSlice';


const Homepage = () => {

  const { data:products, error, isLoading } = useGetProductsQuery();
  
  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>{error}</p>;
  


  return (
    <>
        <h2 className="text-3xl mx-4 my-10 text-white dark:text-black">All Product</h2>
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