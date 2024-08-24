import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./employe.css";
import IdContext from "../../../../context/IdContext";
import useAxiosPrivate from "../../../../CustomApi/UseAxiosPrivate";

// import { Link } from "react-router-dom";

const Employe = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");

  const [data, setData] = useState({
    designation: "",
    location: "",
    company: "",
  });
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useContext(IdContext);
  console.log(userId);

  const dataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitForm = async () => {
    try {
      if (!data.company) {
        return setCompany("* Required");
      } else {
        const response = await axiosPrivate.post(
          `/api/employer/createEmployer/${userId}`
        );
        console.log(response.data);
        if (response.status === 201) {
          toast.success("suucefully register");
          navigate("/intrest");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);

  return (
    <div className="anoop13">
      <div className="employe">
        <h3>Job Details</h3>

        <div className="cont">
          <label className="left33" htmlFor="">
            <input
              placeholder="Company Name"
              type="text"
              name="company"
              onChange={dataChange}
            />{" "}
            <br />
            <span style={{ color: "red", fontSize: "13px" }}>{company}</span>
          </label>

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

        <button className="btnemp" onClick={submitForm}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Employe;
