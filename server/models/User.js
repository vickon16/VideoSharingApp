import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const UserSchema = new Schema({
  name : {
    type : String,
    required : true,
    unique : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },
  password : {
    type : String,
  },
  imgUrl : {
    type : String,
    default : "",
  },
  subscribers : {
    type : Number,
    default : 0
  },
  subscribedUsers : {
    type : [String]
  },
  fromGoogle : {
    type : Boolean,
    default : false,
  }
  
}, {timestamps : true})

const User = models.User || model("User", UserSchema);

export default User;