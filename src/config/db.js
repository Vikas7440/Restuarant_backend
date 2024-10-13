import mongoose from 'mongoose'
import colors from 'colors'

import  dotenv  from 'dotenv';

dotenv.config();
//const mongodbUrl = "mongodb+srv://vikasmandal:Vikas7440@cluster1onlinefood.itk25.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1onlineFood"
const mongodbUrl = process.env.MONGODB_URL;

const connectDb = async()=>{
    try {
       await mongoose.connect(mongodbUrl);
        console.log("mongodb connect".bgGreen);
    } catch (error) {
        console.log("mongodb not connect".bgRed);
        console.log(error);
    }
}

export default connectDb;

