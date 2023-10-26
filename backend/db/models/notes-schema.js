import mongoose from "../connection.js";

const Schema = mongoose.Schema;
const noteSchema = new Schema({
    'mid':{type: String},
    'note': {type: String},
    'docname':{type: String},
    'orgname':{type: String},
    'date':{type: String}
});

export const consultation = mongoose.model('consultation', noteSchema);
