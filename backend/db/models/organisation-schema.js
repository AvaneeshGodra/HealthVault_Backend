import mongoose from "../connection.js";
import {SchemaTypes} from "mongoose";

const Schema=mongoose.Schema;
const orgSchema=new Schema({
    'email':{type:SchemaTypes.String ,required:true, unique:true},
    'password':{type:SchemaTypes.String ,required:true, minLength:3, maxLength:100},
    'orgname':{type:SchemaTypes.String },
    'docname':{type:SchemaTypes.String }
});

export const orgModel=mongoose.model('orgdb',orgSchema);