import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required:true
            }
        }
    ],
    shippingAddress:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentResult:{
        type:String,
        required:true
    },
    itemPrice:{
        type:Number,
        required:true
    },
    taxPrice:{
        type:Number,
        required:true
    },
    shippingPrice:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true
    },
    isDelivered:{
        type:Boolean,
        required:true
    }

}, {
    timestamps:true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;