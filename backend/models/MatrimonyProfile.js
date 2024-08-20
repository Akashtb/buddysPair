import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: { type: String},
    firstName: { type: String},
    lastName: { type: String},
    age: { type: Number},
    gender: { type: String},
    dateOfBirth: { type: Date},
    state: { type: String},
    district: { type: String},
    city: { type: String},
    height: { type: String },
    caste: { type: String },
    religion: { type: String },
    qualification: { type: String},
    profession: { type: String},
    profilePic:{type:String},
    photos:{type:String},
    aboutMe:{type:String},
    video:{type:String},
    phoneNumber: { type: String},
    email: { type: String},
    address: { type: String},
    aboutMe: { type: String },
    horoscope: { type: String },
    photos: [{ type: String }],
    
}, {
    timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;