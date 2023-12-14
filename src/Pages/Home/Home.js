import React, { useState, useEffect } from "react";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/footer";
import { Navbar } from "../../Components/Navbar/Navbar";

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const images = ["2d207d2b(1).jpg", "b3afd7e9.jpg"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userAccessToken = localStorage.getItem("accessToken");
    console.log("userAccessToken is: ", userAccessToken);
    setIsLoggedIn(!!userAccessToken);

    const storedCheckInDate = localStorage.getItem("checkInDate");
    const storedCheckOutDate = localStorage.getItem("checkOutDate");

    if (storedCheckInDate) {
      setCheckInDate(storedCheckInDate);
    }
    if (storedCheckOutDate) {
      setCheckOutDate(storedCheckOutDate);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCheckInDateChange = (event) => {
    const newCheckInDate = new Date(event.target.value)
      .toISOString()
      .split("T")[0];
    setCheckInDate(newCheckInDate);

    localStorage.setItem("checkInDate", newCheckInDate);
    console.log("newCheckInDate is: ", newCheckInDate);
  };

  const handleCheckOutDateChange = (event) => {
    const newCheckOutDate = new Date(event.target.value)
      .toISOString()
      .split("T")[0];
    setCheckOutDate(newCheckOutDate);

    localStorage.setItem("checkOutDate", newCheckOutDate);
    console.log("newCheckOutDate is: ", newCheckOutDate);
  };

  const handleSearchRooms = () => {
    if (checkInDate && checkOutDate) {
      const { state } = location;
      if (isLoggedIn) {
        navigate("/available-rooms");
      } else {
        console.log("Access Token not found in state");
      }
    } else {
      console.log("Please select both check-in and check-out dates.");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        
      }}
    >
      {/* <Navbar /> */}
      <div style={{ width: "100vw", position:"absolute",top: 40, left: 0, bottom: 0, right: 0 , overflowX: "hidden", }}>
        <div style={{ transition: "0.5s ease-in-out", position: "relative" }}>
          <img
            src={`/images/${images[currentIndex]}`}
            alt="Gallery"
            style={{ width: "100vw", height: "100vh", objectFit: "cover", 
           
             }}
          />
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              /* background-color: rgba(0, 0, 0, 0.5); Add a background color to make the text more readable */
              padding: "10px",
              color: "rgb(241, 138, 42)",
              fontSize: "24px",
            }}
          >
            <h1>Abide in me hotel</h1>
          </div>

          <div className="booking-container">
            <div className="date-input">
              <label className="date-label" htmlFor="checkInDate">
                Check In Date:
              </label>
              <input
                className="date-picker"
                type="date"
                id="checkInDate"
                value={checkInDate}
                onChange={handleCheckInDateChange}
              />
            </div>
            <div className="date-input">
              <label className="date-label" htmlFor="checkOutDate">
                Check Out Date:
              </label>
              <input
                className="date-picker"
                type="date"
                id="checkOutDate"
                value={checkOutDate}
                onChange={handleCheckOutDateChange}
              />
            </div>
            <div className="button-container">
              <button
                className="search-button"
                onClick={handleSearchRooms}
                disabled={!checkInDate || !checkOutDate}
              >
                Search Available Rooms
              </button>
            </div>
          </div>
          <div className="image-nav-buttons">
            <button className="prev" onClick={handlePrevClick}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="next" onClick={handleNextClick}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <Footer />
      </div>

      
    </div>
  );
};

export default Home;
