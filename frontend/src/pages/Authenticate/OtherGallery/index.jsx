import { useEffect, useState } from "react";
import "./gallery.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const Getprofile = async () => {
    const getresponse = await axios.get(
      `http://localhost:1400/user/profile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("hiop", getresponse.data.reg.multipleimg);
    setData(getresponse.data.reg.multipleimg);
  };

  const back25 = () => {
    window.location.href = `/other/${id}`;
  };

  useEffect(() => {
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
        <h1 className="nav25">
          <i class="fa-solid fa-angle-left"></i>
          <h3 className="h3333">Gallery</h3>
          <h2 onClick={back25}>back</h2>
        </h1>
      </div>
      <div className="image27">
        {data.map((item, index) => {
          return (
            <div key={index} className="pics">
              <img className="image25" src={item.url} alt="image" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
