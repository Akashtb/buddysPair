import mongoose from 'mongoose';

const connectedMatrimonyProfile = new mongoose.Schema({
    fromUID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    toUID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "blocked"],
        default: "pending",
    },
    blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        default: null,   
    }
}, {
    timestamps: true,
});

// Ensure unique connection between the two users
connectedMatrimonyProfile.index({ fromUID: 1, toUID: 1 }, { unique: true });

const MatrimonyProfileconnection = mongoose.model('ConnectedMatrimonyProfile', connectedMatrimonyProfile);
export default MatrimonyProfileconnection;
