import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
    userIdRef: { type: String },
    companyName: {
        type: String,
       
    },
    industry: {
        type: String 
    },
    contactPerson: {
        type: String
    },
    contactEmail: {
        type: String,  
    },
    contactPhone: {
        type: String
    },
    location: {
        type: String
    }
},{
    timestamps: true,
});

const Employer= mongoose.model('Employer', employerSchema);
export default Employer;
