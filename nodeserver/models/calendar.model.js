import {Schema,model} from "mongoose";

const calendarSchema = new Schema({
    userId: {type: Schema.Types.ObjectId,ref: "user",required: true},
    sessions: [{type: Schema.Types.ObjectId, ref: "session"}]
},
{
    versionKey: false,
    timestamps: true,
    strict: false
})

const Calendars = model("calendar",calendarSchema);
export default Calendars;