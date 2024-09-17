
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./employe.css";
import IdContext from "../../../../context/IdContext";
import { axiosPrivate } from "../../../../CustomApi/Axios";

// import { Link } from "react-router-dom";

const Employe = () => {


  const navigate = useNavigate();

  const [data, setData] = useState({
    designation:"",
    location:"",
    company:""
  });
  


  const dataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitForm = async()=>{

    const { designation,location,company} = data

    if(!designation){
      toast.error("Please fill the designation");
      return;
    }

    if(!location){
      toast.error("Please fill the location");
      return;
    }

    if(!company){
      toast.error("Please fill the company");
      return;
    }

    try {
      const response = await axiosPrivate.post(`/api/employee/createEmployee`,data)
      console.log(response.data)
      if(response.status === 201){
        toast.success("suucefully register")
        navigate('/intrest')
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(data);
  
 
  return (
    <div className="anoop13">
      <div className="employe">
        <h3>Job Details</h3>

        <div className="cont">
          <input
            placeholder="Company Name"
            type="text"
            name="company"
            onChange={dataChange}
          />

          <input
            placeholder="Designation"
            type="text"
            name="designation"
            onChange={dataChange}
          />

          <input
            placeholder="Location"
            type="text"
            name="location"
            onChange={dataChange}
          />
        </div>

        <button className="btnemp" onClick={submitForm} >
          Next
        </button>
      </div>
    </div>
  );
};
export default Employe;
