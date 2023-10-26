import mongoose from "mongoose";


import dotenv from 'dotenv'
dotenv.config()

const promise=mongoose.connect(process.env.DB_CONNECTION);
promise.then(data=>{
    console.log('Db Connected . .');
}).catch(err=>{
    
    console.log(err);
})
export default mongoose;