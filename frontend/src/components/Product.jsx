import {Link} from "react-router-dom";
import Rating from "./Rating";

const Product = ({products}) => {

  return (
    <Link to={`/product/${products._id}`}>
      <div className="card bg-gray-800 shadow-xl mb-4 mx-4 text-[#DBD8E3]" id={`${products._id}`}>

        <figure>
          <img src={`${products.image}`} alt="Shoes" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{products.name}</h2>

            <div className='flex'>
              <Rating value={products.rating} text={products.numReviews}/>  
            </div>
            <p>${products.price}</p>

          <p>{products.description}</p>
        </div>

      </div>
    </Link>
  )
}

export default Product