import { Schema,model } from "mongoose";

const sessionSchema = new Schema({
    sessionStart: {type: Number,required: true},
    duration: {type: Number,required: true},
    slots: {type: Number,required: true},
    summary: {type: String,required: true},
    description: {type: String,required: false},
    location: {type: String, required: true},
    timeZone: {type: String,required: true}
},{
    versionKey: false,
    timestamps: true,
    strict: false
})

const Sessions = model("session",sessionSchema);
export default Sessions;