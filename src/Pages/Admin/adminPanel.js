import React, { useState,  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewRoom } from './roomReducer'; 
import './AdminPanel.css'
import { fetchBookedRooms } from './bookedRoomsSlice';



function AdminPanel() {
    const dispatch = useDispatch();
    const bookedRooms = useSelector(state => state.bookedRooms); 
    const accessToken = localStorage.getItem('accessToken');

useEffect(() => {
  dispatch(fetchBookedRooms(accessToken));
}, [dispatch, accessToken]); 
  
 
  
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
          setNewRoom({
            room: 0,
            roomType: '',
            rentperday: 0,
            RoomPhoto: '',
            discription: '',
            isBooked: false,
          }); 
        })
        .catch(error => {
          console.error('Error adding room:', error);
        });
    };
  
    return (

      <div>
        <div className="admin-panel-container">
        
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
           <button className="submit-button" onClick={handleAddRoom}>Add Room</button>
        </div>
        <div className='booked-rooms'>
          {/* <h1>Booked Rooms</h1> */}
          {bookedRooms.map((room, index) => (
            <div key={index} className="room-card">
              <img src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
              <div className="room-info">
                <h3>Room {room.roomNumber}</h3>
                <p>Price: R{room.price}</p> {/* Displaying the price */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;