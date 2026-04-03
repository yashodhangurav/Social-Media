import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({    
    userId: {                                               //who is sending the request
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    connectionId: {                                         //to whome the request is sent
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status_accepted: {
        type: Boolean,
        default: null
    },
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequest);
export default ConnectionRequest;