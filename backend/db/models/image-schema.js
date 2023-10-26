import mongoose from "../connection.js";
import {SchemaTypes} from "mongoose";


const Schema=mongoose.Schema;
const imgSchema=new Schema({
    'image':{data:Buffer, type:SchemaTypes.String},
    'userid':{type:SchemaTypes.String},
    'date':{type:SchemaTypes.String}
});

export const imgModel=mongoose.model('userimgdb',imgSchema);