import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,           //connecting User model to Comment model
        ref: "User",
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,           //post doent have to know about comment but comment has to know about post
        ref: "Post",
    },
    body:{
        type: String,
        required: true
    },
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;