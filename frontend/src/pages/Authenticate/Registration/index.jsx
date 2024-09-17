import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../CustomApi/UseAxiosPrivate";
import { toast } from "react-toastify";
import axios from "axios";
import "./reg.css";
import IdContext from "../../../context/IdContext";

const Registration = () => {
  const propicRef = useRef(null);
  const multipleImgRef = useRef(null);
  const reelRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [ImageName, setImgName] = useState({});
  const [multiple, setMultiple] = useState([]);

  // console.log(id);

  const [profileData, setProfileData] = useState({
    age: "",
    gender: "",
    dateOfBirth: "",
    hobbies: "",
    interest: "",
    smoking: false,
    drinking: false,
    propic: null,
    multipleimg: [], // Ensure this is always an array
    reel: [], // Ensure this is always an array
  });

  const dataChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, (option) => option.value);
      setProfileData((prevData) => ({ ...prevData, [name]: values }));
    } else if (name === "smoking" || name === "drinking") {
      setProfileData((prevData) => ({ ...prevData, [name]: value === "true" }));
    } else {
      setProfileData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload"); // Replace with your Cloudinary preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary", error);
      toast.error("Failed to upload file");
      return null;
    }
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

  const handleFileChange = async (e) => {
    console.log("hy");
    const { name, files } = e.target;

    if (files.length > 0) {
      let fileUrls = [];

      // Check file size
      const validateFileSize = (file) => file.size <= MAX_FILE_SIZE;

      // Upload files to Cloudinary and collect their URLs
      const uploadFiles = async () => {
        const fileArray = Array.from(files);

        // Filter out files that are too large
        const validFiles = fileArray.filter(validateFileSize);
        if (fileArray.length !== validFiles.length) {
          toast.error("Some files are too large and will not be uploaded.");
        }

        return Promise.all(validFiles.map(uploadToCloudinary));
      };

      if (name === "propic") {
        const file = files[0];
        console.log("my file", file);
        setImgName(file);
        if (validateFileSize(file)) {
          const url = await uploadToCloudinary(file);
          if (url) {
            setProfileData((prevData) => ({ ...prevData, propic: url }));
            toast.success("Profile image uploaded successfully");
          }
        } else {
          toast.error("File is too large.");
        }
      } else if (name === "multipleimg") {
        // console.log("halo", files);
        const file = files[0];
        //display image name
        setMultiple([...multiple, file]);
        ////
        const existingCount = Array.isArray(profileData.multipleimg)
          ? profileData.multipleimg.length
          : 0;
        if (files.length + existingCount > 5) {
          toast.error("You can only upload up to 5 images");
          return;
        }
        fileUrls = await uploadFiles();
        if (fileUrls.every((url) => url)) {
          setProfileData((prevData) => ({
            ...prevData,
            multipleimg: [
              ...(Array.isArray(prevData.multipleimg)
                ? prevData.multipleimg
                : []),
              ...fileUrls,
            ],
          }));
          toast.success("Images uploaded successfully");
        }
      } else if (name === "reel") {
        const existingCount = Array.isArray(profileData.reel)
          ? profileData.reel.length
          : 0;
        if (files.length + existingCount > 5) {
          toast.error("You can only upload up to 5 videos");
          return;
        }
        fileUrls = await uploadFiles();
        if (fileUrls.every((url) => url)) {
          setProfileData((prevData) => ({
            ...prevData,
            reel: [
              ...(Array.isArray(prevData.reel) ? prevData.reel : []),
              ...fileUrls,
            ],
          }));
          toast.success("Videos uploaded successfully");
        }
      }
    }
  };

  const handleButtonClick = (ref) => {
    ref.current.click();
  };

  const registerProfile = async () => {
    try {
      const response = await axiosPrivate.patch(
        `/api/auth/reRegistration/${id}`,
        profileData
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Profile created successfully");
        navigate(`/job`);
      } else {
        toast.error("Failed to create profile");
      }
    } catch (error) {
      toast.error("An error occurred while creating the profile");
      console.error(error);
    }
  };

  const RemoveProfilePic = () => {
    setProfileData((prevData) => ({ ...prevData, propic: "" }));

    return setImgName(""), toast.error("Image removed successfully");
  };
  const Remove12 = (re) => {
    console.log("remove item", re);
    const newdta = multiple.findIndex((item) => item.name === re);
    if (newdta !== -1) {
      multiple.splice(newdta, 1);
    }
    toast.error("Remove successfully");
    // console.log("mul", multiple);

    const condition = (i) => {
      return i;
    };

    const newarr = profileData.multipleimg.findIndex(condition);
    if (newarr !== -1) {
      profileData.multipleimg.splice(newarr, 1);
    }

    console.log("mi dear", profileData.multipleimg);
    if (profileData.multipleimg.length === 0) {
      setProfileData((prevData) => ({ ...prevData, multipleimg: [] }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        multipleimg: [profileData.multipleimg],
      }));
    }

    // console.log("mmmmm", profileData.multipleimg);
  };

  console.log("daata", profileData);
  console.log("pics", profileData.multipleimg);
  console.log("pics123", multiple);

  return (
    <div className="anoop16">
      <div className="box">
        <div className="card1_1_1">
          <h3>Profile Details</h3>
          <div className="card1_1_2">
            <div className="part1">
              <label>
                <input
                  placeholder="Age"
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={dataChange}
                />
              </label>

              <label>
                <select
                  name="gender"
                  onChange={dataChange}
                  value={profileData.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                <input
                  className="date12"
                  placeholder="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={dataChange}
                />
              </label>

              <label>
                <input
                  placeholder="Hobbies"
                  type="text"
                  name="hobbies"
                  value={profileData.hobbies}
                  onChange={dataChange}
                />
              </label>

              <label>
                <select
                  type="text"
                  name="interest"
                  value={profileData.interest}
                  onChange={dataChange}
                >
                  <option value="">Interest</option>
                  <option value="Music">Music</option>
                  <option value="Dance">Dance</option>
                  <option value="Riding">Riding</option>
                  <option value="Travelling">Travelling</option>
                  <option value="Sports">Sports</option>
                  <option value="Fitness">Fitness</option>
                </select>
              </label>
            </div>

            <div className="part2">
              <label>
                <select name="smoking" onChange={dataChange}>
                  <option value="">Smoking ?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
              <label>
                <select name="drinking" onChange={dataChange}>
                  <option value="">Drinking ?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>

              <div className="koo">
                {/* <h1>{ImageName.name}</h1> */}
                {/* <h1>Profile Image</h1> */}
                {ImageName.name ? (
                  <div className="proimg">
                    {ImageName.name}
                    <i onClick={RemoveProfilePic} class="fa-solid fa-xmark"></i>
                  </div>
                ) : (
                  <h1> Profile picture</h1>
                )}
                <input
                  type="file"
                  name="propic"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={propicRef}
                  style={{ display: "none" }}
                />
                <label>
                  <button onClick={() => handleButtonClick(propicRef)}>
                    <i className="fa-solid fa-image"></i>
                  </button>
                </label>
              </div>

              <div className="koo">
                {profileData.multipleimg.length > 0 ? (
                  <div className="proimg2">
                    {multiple.map((i, index) => {
                      return (
                        <div key={index} className="close5">
                          {i.name}

                          <i
                            onClick={() => {
                              Remove12(i.name);
                            }}
                            class="fa-solid fa-xmark"
                          ></i>
                        </div>
                      );
                    })}
                    {/* <i onClick={RemoveProfilePic} class="fa-solid fa-xmark"></i> */}
                  </div>
                ) : (
                  <h1> Add more picture</h1>
                )}
                <input
                  type="file"
                  name="multipleimg"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  ref={multipleImgRef}
                  style={{ display: "none" }}
                />
                <label>
                  <button onClick={() => handleButtonClick(multipleImgRef)}>
                    <i className="fa-solid fa-image"></i>
                  </button>
                </label>
              </div>

              <div className="koo">
                <h1>Add Reels</h1>
                <input
                  type="file"
                  name="reel"
                  accept="video/*"
                  multiple
                  onChange={handleFileChange}
                  ref={reelRef}
                  style={{ display: "none" }}
                />
                <label>
                  <button onClick={() => handleButtonClick(reelRef)}>
                    <i className="fa-solid fa-video"></i>
                  </button>
                </label>
              </div>
            </div>
          </div>

          <button className="regbtn" onClick={registerProfile}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
