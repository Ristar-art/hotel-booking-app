import React, { useEffect } from "react";
import "./gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRooms } from "./gallerySlice";

function Gallery() {
  const dispatch = useDispatch();
  const pictures = useSelector((state) => state.gallery.pictures);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

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
          flexDirection: "column",
          justifyContent: "center",
          // textAlign:'center',
          alignItems: "center",
        }}
      >
        {/* <h1>Gallery</h1> */}
      </div>
      <div
        style={{
         // backgroundColor: "#f7f7f7",
        //  padding: "40px",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          alignItems: "center" /* Center align the children horizontally */,
          justifyContent: "center",
          flexWrap:'wrap'
          
        }}
      >
        {pictures.map((room, index) => (
          <div key={index}>
            <img
              src={room.roomPhoto}
              alt={`Room ${room.roomNumber}`}
              style={{ height: "30vh", width: "30vw", borderRadius: 20, padding:10 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
