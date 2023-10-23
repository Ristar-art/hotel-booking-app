import React, { useState, useEffect } from "react";
import "./success.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, clearError, clearForm } from '../Components/SignUp/singUpSlice';

const Success = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const roomNumber = localStorage.getItem("chosenRoom");
  const [user, setUser] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [historyCreated, setHistoryCreated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const roomResponse = await fetch(
          `http://localhost:8000/api/room/${roomNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!roomResponse.ok) {
          throw new Error("Failed to fetch room details");
        }

        const roomData = await roomResponse.json();

        if (isMounted) {
          setBookingDetails({
            roomNumber: roomData.roomNumber,
            roomType: roomData.roomType,
            checkInDate: roomData.checkin,
            checkOutDate: roomData.checkout,
            totalPrice: roomData.price,
            numberOfDays: roomData.numberOfDays,
          });
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [accessToken, roomNumber]);

  useEffect(() => {
    const createHistoryEntry = async () => {
      try {
        if (bookingDetails.roomNumber && !historyCreated) {
          console.log("bookingDetails request is: ", bookingDetails);
          const userProfileResponse = await fetch(
            "http://localhost:8000/api/user-profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (userProfileResponse.ok) {
            const userData = await userProfileResponse.json();
            setUser(userData.email);

            const historyData = {
              email: userData.email,
              roomNumber: bookingDetails.roomNumber,
              roomType: bookingDetails.roomType,
              checkInDate: bookingDetails.checkInDate,
              checkOutDate: bookingDetails.checkOutDate,
              price: bookingDetails.totalPrice,
              numberOfDays: bookingDetails.numberOfDays,
            };
            console.log("the createHistoryResponse request is called");
            const createHistoryResponse = await fetch(
              "http://localhost:8000/api/createHistory",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(historyData),
              }
            );

            if (!createHistoryResponse.ok) {
              throw new Error("Failed to create history entry");
            }

            console.log("History entry created successfully");
            setHistoryCreated(true);
            dispatch(clearError());
            dispatch(clearForm());
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error creating history entry:", error);
      }
    };

    createHistoryEntry();
  }, [accessToken, bookingDetails, historyCreated]);

  return (
    <div className="display">
      <div className="receipt-container">
        <h2>Booking Receipt</h2>
        <p>
          <strong>Room Number:</strong> {bookingDetails.roomNumber}
        </p>
        <p>
          <strong>Room Type:</strong> {bookingDetails.roomType}
        </p>
        <p>
          <strong>Check-in Date:</strong> {bookingDetails.checkInDate}
        </p>
        <p>
          <strong>Check-out Date:</strong> {bookingDetails.checkOutDate}
        </p>
        <p>
          <strong>Total Price:</strong> {bookingDetails.totalPrice}
        </p>
        <p>
          <strong>Number of Days:</strong> {bookingDetails.numberOfDays}
        </p>
      </div>
    </div>
  );
};

export default Success;
