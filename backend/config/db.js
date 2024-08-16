import mongoose from "mongoose";


const connectDB = async () => {

    try{
        const conn = await mongoose.connect("mongodb+srv://poorana:5577@ecom.za5m913.mongodb.net/ecom");
        console.log("Connected To The DataBase");
    }
    catch(err){
        console.log(`Error - ${err.message}`);
        process.exit(1);
    } 
}

export default connectDB;