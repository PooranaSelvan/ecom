import mongoose from "mongoose";


const connectDB = async () => {

    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI); // Used to connect with mongodb
        console.log("Connected To The DataBase");
    }
    catch(err){
        console.log(`Error - ${err.message}`); // if there is any error it displays
        process.exit(1);
    } 
}

export default connectDB;