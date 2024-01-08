import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./RoomDescription.css";
import Footer from "../../Components/Footer/footer";

const RoomDescriptionPage = () => {
  const { roomNumber } = useParams();
  const [room, setRoom] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const checkInDate = localStorage.getItem("checkInDate");
  const checkOutDate = localStorage.getItem("checkOutDate");
  const isbooked = true;
  const totalPrice = localStorage.getItem("totalPrice");
  const numberOfDays = localStorage.getItem("numberOfDays");

  useEffect(() => {
    const fetchRoomInformation = async () => {
      try {
        const roomResponse = await fetch(
          `http://localhost:8000/api/room/${roomNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!roomResponse.ok) {
          throw new Error("Failed to fetch room details");
        }
        const data = await roomResponse.json();
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room information:", error);
      }
    };

    fetchRoomInformation();
  }, [roomNumber, accessToken]);

  const handleBooking = async () => {
    try {
      // First, update room dates
      const updateRoomResponse = await fetch(
        `http://localhost:8000/api/update-room-dates/${roomNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            checkInDate,
            checkOutDate,
            isbooked,
            totalPrice,
            numberOfDays,
          }),
        }
      );

      if (!updateRoomResponse.ok) {
        throw new Error("Failed to update room dates");
      }

     

      // Then, create a checkout session
      const items = [
        {
          price_data: {
            currency: "zar",
            product_data: {
              roomNumber: room.roomNumber,
              roomType: room.roomType,
            },
            unit_amount: totalPrice,
          },
          quantity: 1,
        },
      ];

      const createCheckoutResponse = await fetch(
        "http://localhost:8000/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ items }),
        }
      );

      if (createCheckoutResponse.ok) {
        const { url } = await createCheckoutResponse.json();
        window.location.href = url;
      } else {
        throw new Error("Failed to create a checkout session");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      {/* <Navbar /> */}
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          // textAlign:'center',
          alignItems: "center",
          flexWrap: "wrap",
          position: "absolute",
          top: 40,
          left: 0,
          bottom: 0,
          right: 0,
          overflowX: "hidden",
          // backgroundColor: "red",
        }}
      >
        <img
          src={room.roomPhoto}
          alt={room.roomType}
          style={{ borderRadius: 10, height: "50vh", padding: 2 }}
        />

        <div
          style={{
        //alignItems: "center",
            justifyContent: "flex-start",
            display: "flex",
            flexDirection: "column",
            width: "40vw",
            height: "50vh",
          }}
        >
          <div style={{ height: "80%", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p style={{ marginRight: 5 }}>Room type:</p>
              <p>{room.roomType}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p style={{ marginRight: 5 }}>Discription:</p>
              <p>{room.description}</p>
            </div>
          </div>

          
            <button style={{backgroundColor:'#4CAF50'}} onClick={handleBooking}>Book</button>
       
        </div>
        <br></br>
        <div className="footer">{/* <Footer /> */}</div>
      </div>
    </div>
  );
};

export default RoomDescriptionPage;
