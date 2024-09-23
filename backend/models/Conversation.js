import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Profile",
    },
    isContacted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Check if the model is already compiled, and if so, reuse it
const ConversationMembers = mongoose.models.ConversationUsers || mongoose.model("ConversationUsers", ConversationSchema);

export default ConversationMembers;
