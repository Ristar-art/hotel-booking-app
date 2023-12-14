import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "../Loginpages/loginSlice";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const isLoading = useSelector((state) => state.Login.isLoading); // Get isLoading from Redux store
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  // console.log('accessToken is: ', accessToken)
  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:8000/api/user-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setEmail(userData.email);
        console.log(userData.email);
        dispatch(setLoading(false)); // Set isLoading to false when data is loaded
      } else {
        setUser(null);
        setEmail(null);
        dispatch(setLoading(false)); // Set isLoading to false even if there's an error
        dispatch(setError("Error fetching user profile"));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      dispatch(setLoading(false)); // Set isLoading to false in case of an error
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    // const accessToken = localStorage.getItem('accessToken');
    console.log(email);
    if (accessToken) {
      if (isLoading) {
        // Check if isLoading is true
        fetchUserData(accessToken);
      }
    }
  }, [isLoading]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setEmail(null);
  };

  return { user, email, isLoading, handleLogout };
};

export const Navbar = () => {
  const { user, email, isLoading, handleLogout } = useAuth();

  return (
    <nav
      style={{
        position: "relative",
        width: "100vw",
        maxHeight: "10vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        zIndex: 100,
      }}
    >
      <div
        style={{
          marginLeft: 5,
          height: "100%",
          alignItems: "center",
          display: "flex",
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <Link
          to="/"
          style={{ marginRight: "10px", textDecoration: "none", color: "#333" }}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={{ marginRight: "10px", textDecoration: "none", color: "#333" }}
        >
          About
        </Link>
        <Link
          to="/gallery"
          style={{ marginRight: "10px", textDecoration: "none", color: "#333" }}
        >
          Gallery
        </Link>
        <Link
          to="/signup"
          style={{ marginRight: "10px", textDecoration: "none", color: "#333" }}
        >
          SignUp
        </Link>

        {email === "mochochokoboiketlo@gmail.com" && email !== null && (
          <Link
            to="/admin"
            style={{
              marginRight: "10px",
              textDecoration: "none",
              color: "#333",
            }}
          >
            Admin
          </Link>
        )}
      </div>
      < div style={{
              marginRight: 50,
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 10,
              paddingTop: 10,
              flexWrap: "wrap",
            }}>
        {email ? (
          <div
            
          >
            <>
              <Link to="/userprofile" style={{ marginRight: 20 }}>
                {email}
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#333" }}
                onClick={handleLogout}
              >
                Log out
              </Link>
            </>
          </div>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "#333" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
