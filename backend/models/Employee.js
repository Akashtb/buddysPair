import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    userIdRef: { type: String },
    designation: {
        type: String,
    },
    currentSalary: {
        type: Number
    },
    currentlyWorking: {
        type: Boolean,
    },
    previousSalary: {
        type: Number
    },
    lastWorkingDate: {
        type: Date
    },
    quitReason: {
        type: String
    },
    contactInfo: {
        email: { type: String },
        phone: { type: Number }
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee