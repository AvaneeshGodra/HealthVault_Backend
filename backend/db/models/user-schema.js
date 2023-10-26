import mongoose from "../connection.js";
import {SchemaTypes} from "mongoose";

const Schema=mongoose.Schema;
const userSchema=new Schema({
    'name':{type:SchemaTypes.String ,required:true},
    'email':{type:SchemaTypes.String ,required:true, unique:true},
    'password':{type:SchemaTypes.String ,required:true, minLength:3, maxLength:100},
    'Mid':{type:SchemaTypes.String ,required:true, unique:true},
    'phone':{type:SchemaTypes.String},
    'address':{type:SchemaTypes.String}
    
});

export const userModel=mongoose.model('users',userSchema);