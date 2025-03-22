import mongoose from "mongoose";
import 'dotenv/config';

export const connectBD=async()=>{
    try
    {
        const url=process.env.DATABASEURL
        const connection= await mongoose.connect(url)
        console.log('Mongo conectado');
    }
    catch(error)
    {
        console.log(error.message)
    }
}