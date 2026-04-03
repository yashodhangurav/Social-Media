import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: "default.jpg"
    },
    followers: {
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    token:{
        type: String,
        default: ""
    },

    following: {
        type: [String],
        default: []
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

const User = mongoose.model("User", UserSchema);
export default User;