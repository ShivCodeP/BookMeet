import mongoose from "mongoose";
const {Schema,model} = mongoose;

const userSchema = new Schema({
    username:{type:String,required: true},
    sessions: [{type:Schema.Types.ObjectId,ref:"session"},{strict:false}],
    admin: {type: Boolean, required: true},
},{
    versionKey: false,
    timestamps: true,
})

const Users = model("user",userSchema);
export default Users;