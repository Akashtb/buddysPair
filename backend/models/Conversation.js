import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Profile",
    },
    isContacted:{
        type:Boolean,
        default:false
    }
},{timestamps:true}
)

const ConversationMembers = mongoose.model("ConversationUsers",ConversationSchema);
export default ConversationMembers