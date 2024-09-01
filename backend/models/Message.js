import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ConversationUsers', required: true 
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
},{timestamps:true}
)

const MessageOfUser = mongoose.model("MessageOfUser",MessageSchema);
export default MessageOfUser
