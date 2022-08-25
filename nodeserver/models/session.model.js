import mongoose from "mongoose";
const { Schema,model } = mongoose;

const sessionSchema = new Schema({
    sessionStart: {type: String,required: true},
    sessionEnd: {type: String,required: true},
    summary: {type: String,required: true},
    description: {type: String,required: false},
    location: {type: String, required: true},
    timeZone: {type: String,required: true},
    status: {type: Boolean,default:false}
},{
    versionKey: false,
    timestamps: true,
    strict: false
})

const Sessions = model("session",sessionSchema);
export default Sessions;