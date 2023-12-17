import React, { useState, useEffect } from 'react';
import './history.css'; // Make sure to create a History.css file and import it here

const History = () => {
  const [history, setHistory] = useState([]);
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/userHistory', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        const data = await response.json();

        console.log('data is: ',data)
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div style={{      
      display: "flex",     
      justifyContent: "center",
      position: "absolute",    
      left: 0,      
      right: 0,
      overflowX: "hidden",
    }}>
      <div className="about-intro">
        <h1>History of your Rents </h1>
      </div>
      <div className="about-content">
        {history.map((item) => (
          <div key={item._id} className="about-section">
            <h2>Room: {item.roomNumber}</h2>
            <p>Room Type: {item.roomType}</p>
            <p>Check-in: {item.checkInDate}</p>
            <p>Check-out: {item.checkOutDate}</p>
            <p>Price: {item.price}</p>
            <p>Number of Days: {item.numberOfDays}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
