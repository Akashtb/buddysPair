import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String
    },
    password: {
        type: String,
    },
    phno: {
        type: Number,
    },
    age: { type: Number },

    gender: { type: String },
    
    dateOfBirth: { type: Date },
    hobbies: { type: [String] },
    interest: { type: [String] },
    smoking: { type: Boolean },
    drinking: { type: Boolean },
    profilePic: { type: String },
    photos: [{ type: String }],
    video: [{ type: String }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isStaff: {
        type: Boolean,
        default: false
    }

},
    { timestamp: true }
)

const User = mongoose.model('User', userSchema)
export default User;