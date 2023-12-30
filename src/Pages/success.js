import React, { useState, useEffect, useRef } from "react";
import "./success.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  clearError,
  clearForm,
} from "../Components/SignUp/singUpSlice";

const Success = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const roomNumber = localStorage.getItem("chosenRoom");
  const [user, setUser] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({});
  const [historyCreated, setHistoryCreated] = useState(false);
  const [createHistoryInProgress, setCreateHistoryInProgress] = useState(false);
  const historyCreatedRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setBookingDetails({
          roomNumber: roomData.roomNumber,
          roomType: roomData.roomType,
          checkInDate: roomData.checkin,
          checkOutDate: roomData.checkout,
          totalPrice: roomData.price,
          numberOfDays: roomData.numberOfDays,
        });
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchData();
  }, [accessToken, roomNumber]);

  const createHistoryEntry = async () => {
    try {
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

        const history = {
          email: userData.email,
          roomNumber: bookingDetails.roomNumber,
          roomType: bookingDetails.roomType,
          checkInDate: new Date(bookingDetails.checkInDate),
          checkOutDate: new Date(bookingDetails.checkOutDate),
          price: bookingDetails.totalPrice,
          numberOfDays: bookingDetails.numberOfDays,
        };

        if (!history.price || !history.numberOfDays) {
          console.error("Missing required fields for history entry");
          return; // or handle the error as needed
        }

        // Check if history entry creation is in progress
        if (createHistoryInProgress) {
          return;
        }

        // Set createHistoryInProgress to true to prevent multiple calls
        setCreateHistoryInProgress(true);

        // Check if history entry has already been created
        if (!historyCreated) {
          console.log("History entry created this time");

          const createHistoryResponse = await fetch(
            "http://localhost:8000/api/createHistory",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(history),
            }
          );

          if (createHistoryResponse.ok) {
            console.log("Before historyCreated update:", historyCreated);
            setHistoryCreated(true);
            console.log("After historyCreated update:", historyCreated);
          } else {
            throw new Error("Failed to create history entry");
          }
        }
      }
    } catch (error) {
      console.error("Error creating history entry:", error);
    } finally {
      // Set createHistoryInProgress back to false after completion
      setCreateHistoryInProgress(false);
    }
  };

  useEffect(() => {
    try {
      if (
        bookingDetails.roomNumber &&
        bookingDetails.roomType &&
        !historyCreated &&
        !createHistoryInProgress
      ) {
        createHistoryEntry();
        setHistoryCreated(true)
      }
    } catch (error) {
      console.error("Error creating history entry:", error);
    }
  }, [bookingDetails, accessToken, historyCreated, createHistoryInProgress]);

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
          <strong>Check-in Date:</strong>{" "}
          {new Date(bookingDetails.checkInDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Check-out Date:</strong>{" "}
          {new Date(bookingDetails.checkOutDate).toLocaleDateString()}
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
