import Employee from "../models/Employee.js";
import Employer from "../models/Employer.js";
import JobSeeker from "../models/Jobseker.js";



export const creatEmployee = async (req, res) => {
    try {
      const newEmployee = new Employee(req.body);
      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


export const createEmployer = async(req,res)=>{
    try {
        const newEmployer = new Employer(req.body);
        await newEmployer.save();
        res.status(201).json(newEmployer);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const createJobSeeker = async(req,res)=>{
    try{
        const NewJobSeeker = new JobSeeker(req.body);
        await NewJobSeeker.save();
        res.status(201).json(NewJobSeeker);
    }catch(error){
        res.status(400).json({message:error.message})
    }
}