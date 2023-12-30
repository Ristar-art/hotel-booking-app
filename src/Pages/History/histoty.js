import React, { useState, useEffect } from 'react';
import './history.css'; // Make sure to create a History.css file and import it here

const History = () => {
  const [history, setHistory] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

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

        console.log('data is: ', data);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [accessToken]);

  return (
    <div style={{
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'absolute',
      top: 40, left: 0, bottom: 0, right: 0, overflowX: 'hidden',
      textAlign: 'center',
    }}>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h1>History of your Rents</h1>
      </div>

      <div className="about-content">
        {history.map((item) => (
          <div key={item._id} className="about-section">
            <h2>Room: {item.roomNumber}</h2>
            <p>Room Type: {item.roomType}</p>
            <p>Check-in: {new Date(item.checkInDate).toLocaleDateString()}</p>
            <p>Check-out: {new Date(item.checkOutDate).toLocaleDateString()}</p>
            <p>Price: {item.price}</p>
            <p>Number of Days: {item.numberOfDays}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
