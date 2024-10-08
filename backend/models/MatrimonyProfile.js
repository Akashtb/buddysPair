import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String },
    age: { type: Number },
    gender: { type: String },
    dateOfBirth: { type: Date },
    state: { type: String },
    district: { type: String },
    city: { type: String },
    height: { type: Number },
    martialStatus: { type: String },
    annualIncome: { type: String },
    familyType: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    fatherOccupation: { type: String },
    motherOccupation: { type: String },
    numberOfSibilings: { type: Number },
    motherTongue: { type: String },
    bodyType: { type: String },
    numberOfMarriedSibilings: { type: Number },
    expectationAboutPartner: { type: String },
    weight: { type: Number },
    diabilities: { type: String },
    religion: { type: String },
    caste: { type: String },
    patnerExpectation: { type: String },
    hobbies: { type: [String] },
    interest: { type: [String] },
    smoking: { type: Boolean },
    drinking: { type: Boolean },
    qualification: { type: String },
    profession: { type: String },
    profilePic: { type: String },
    photos: [{ type: String }],
    aboutMe: { type: String },
    video: [{ type: String }],
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    horoscope: { type: String },
    preference: {
        gender: { type: String },
        fromAge: { type: Number, default: 21 },
        toAge: { type: Number, default: 35 },
        district: { type: [String] },
        interest: { type: [String] },
        religion: { type: [String] },
        qualification: { type: [String] },
        profession: { type: [String] },
        fromHeight: { type: Number, default: 160 },
        toHeight: { type: Number, default: 190 }
    },
    filter:{
        gender: { type: String },
        age:{
            min:{type:Number},
            max:{type:Number}
        },
        district: { type: String },
        interestsHobbies:{ type: String },
        newestMembers:{ type: String },
        lastActive:{ type: String },
        religion:{ type: String },
    },
    lastLogin: { type: Date },
    lastSeen: { type: Date },
    viewedMyProfile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    contactedProfile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    isOnline: { type: Boolean, default: "false", }
}, {
    timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
