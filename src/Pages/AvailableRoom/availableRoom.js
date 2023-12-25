
import React, { useEffect } from 'react';
import './availableRoom.css';
import { Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvailableRooms } from './availableRoomsSlice';
import Footer from '../../Components/Footer/footer';

function AvailableRooms() {
  const availableRooms = useSelector(state => state.availableRooms);
  const dispatch = useDispatch(); 
  const accessToken = localStorage.getItem('accessToken'); 
  console.log('access token is: ', accessToken)
  const checkInDate = new Date(localStorage.getItem('checkInDate'));
  const checkOutDate = new Date(localStorage.getItem('checkOutDate')); 
  
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  localStorage.setItem('timeDifference',timeDifference)
  const numberOfDays = timeDifference / (1000 * 3600 * 24);
  localStorage.setItem('numberOfDays',numberOfDays)
  console.log('numberOfdays is ',numberOfDays)
  useEffect(() => {
   
    dispatch(fetchAvailableRooms(accessToken));
  }, [dispatch, accessToken]);

  const handleRoomSelect = (roomNumber) => {
    localStorage.setItem('chosenRoom', roomNumber);
  };

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
        flexWrap:'wrap',
        alignItems: "center",
        position:"absolute",top: 40, left: 0, bottom: 0, right: 0 , overflowX: "hidden"
      }}
    >
      <div style={{}}>

      </div>
        {availableRooms.map((room, index) => {
          const totalPrice = numberOfDays * room.rentPerDay;
          localStorage.setItem('totalPrice', totalPrice); 
          return (
            <div key={index} className="room-card">
              <img src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
              <div className="room-info">
                <h3>Room {room.roomNumber}</h3>
                <p>R {totalPrice} for {numberOfDays} days</p>
                <Link
                  to={{
                    pathname: `/room/${room.roomNumber}`
                  }}
                  onClick={() => handleRoomSelect(room.roomNumber)}
                >
                  Description of the room
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className='footer'>
      
      </div>
    </div>
  );
}

export default AvailableRooms;
