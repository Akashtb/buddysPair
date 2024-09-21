import { useEffect, useState } from "react";
import "./gallery.css";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../CustomApi/UseAxiosPrivate";
// import IdContext from "../../../context/IdContext";

import axios from "axios";

const Gallery = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [zoompic, setZoom] = useState({});
  const [zoom2, setZoom2] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  // const { matrimonyProfileId } = useContext(IdContext);

  const Getprofile = async () => {
    const response = await axiosPrivate.get(
      `/api/matrimony/profile/getProfile/${id}`
    );
    setData(response.data.multipleimg);
  };

  const back25 = () => {
    window.location.href = `/other/${data._id}`;
  };

  const Zoom = (z) => {
    console.log("klopp", z);
    setZoom(z);
    setZoom2(true);
  };

  const close44 = () => {
    setZoom2(false);
  };

  useEffect(() => {
    // console.log("zoom", zoompic);
    Getprofile();
  }, []);

  return (
    <div className="anoop100">
      <div className="side1-6">
        <h1>Matrimony</h1>
        <h3>
          <i class="fa-solid fa-house"></i> Home
        </h3>

        <h3>
          {" "}
          <i class="fa-brands fa-facebook-messenger"></i> Message
        </h3>
        <h3>
          {" "}
          <i class="fa-solid fa-star"></i> Favorites
        </h3>
        <h3>
          <i class="fa-solid fa-bell"></i> Notifications
        </h3>
        <h3>
          {" "}
          <i class="fa-solid fa-gear"></i> Settings
        </h3>

        <h3 className="pro1-6">
          <i class="fa-solid fa-user"></i> Profile
        </h3>
      </div>
      <div className="nav26">
        {/* <h1 className="nav25"> */}
        {/* <i class="fa-solid fa-angle-left"></i> */}
        {/* <h1 className="h3333">Gallery</h1> */}
        <button onClick={back25}>view profile</button>
        {/* </h1> */}
      </div>
      <div className="image27">
        {data.map((item, index) => {
          return (
            <div key={index} className="pics7">
              {" "}
              <img
                onClick={() => Zoom(item.url)}
                key={index}
                className="image25"
                src={item.url}
                alt="image"
              />
            </div>
          );
        })}
        {/* <img src="../../../assets/Authentication/profile4.jpeg" alt="" /> */}
      </div>

      {zoom2 ? (
        <div className="blur">
          <div className="jk">
            <i onClick={close44} class="fa-solid fa-xmark"></i>
            <img className="blur2" src={zoompic} alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Gallery;
