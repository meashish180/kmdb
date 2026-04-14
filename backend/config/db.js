import mongoose from "mongoose";

const connectDB = ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected");
        
        
    } catch (error) {
        console.log("Unable to Connect to Database");
    }
}
export default connectDB