import mongoose, { mongo } from "mongoose";

const reviewSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
}, {
    timestamps:true
});

const productSchema = mongoose.Schema({

    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true,
        default:0
    },
    category:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    reviews:{reviewSchema},
    numReviews:{
        type:Number,
        require:true,
        default:0
    },
    countInStock:{
        type:Number,
        require:true
    }

}, {
    timestamps:true
});

const Product = mongoose.model("Product", productSchema);

export default Product;