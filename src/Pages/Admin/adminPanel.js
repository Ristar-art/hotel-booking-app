import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewRoom } from './roomReducer'; // Update the path based on your file structure

function AdminPanel() {
    const dispatch = useDispatch();
    
    const [newRoom, setNewRoom] = useState({
      room: 0,
      roomType: '',
      rentperday: 0,
      RoomPhoto: '',
      discription: '',
      isBooked: false,
    });
  
    const handleAddRoom = () => {
      dispatch(addNewRoom(newRoom))
        .then(() => {
          console.log('Room added successfully');
          setNewRoom({
            room: 0,
            roomType: '',
            rentperday: 0,
            RoomPhoto: '',
            discription: '',
            isBooked: false,
          }); // Reset the form fields
        })
        .catch(error => {
          console.error('Error adding room:', error);
        });
    };
  
    return (
      <div className="admin-panel-container">
        <h2>Admin Panel - Add New Room</h2>
        
        <div className="form-group">
          <label>Room Number:</label>
          <input
            type="number"
            value={newRoom.room}
            onChange={e => setNewRoom({ ...newRoom, room: e.target.value })}
          />
          <label>Room Type:</label>
          <input
            type="text"
            value={newRoom.roomType}
            onChange={e => setNewRoom({ ...newRoom, roomType: e.target.value })}
          />
          <label>Rent per day:</label>
          <input
            type="number"
            value={newRoom.rentperday}
            onChange={e => setNewRoom({ ...newRoom, rentperday: e.target.value })}
          />
          <label>Room Photo:</label>
          <input
            type="text"
            value={newRoom.RoomPhoto}
            onChange={e => setNewRoom({ ...newRoom, RoomPhoto: e.target.value })}
          />
          <label>Room Description:</label>
          <input
            type="text"
            value={newRoom.discription}
            onChange={e => setNewRoom({ ...newRoom, discription: e.target.value })}
          />
        </div>
        {/* Other input fields for new room */}
        <button className="submit-button" onClick={handleAddRoom}>Add Room</button>
      </div>
    );
  }
  
  export default AdminPanel;