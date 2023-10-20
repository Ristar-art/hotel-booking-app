import React, { useState, useEffect } from 'react';
import "./userprofile.css"; // Assuming you have a separate CSS file for styling
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Replace this with your authentication method (e.g., JWT)
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          // Use the token to make authenticated requests to your backend
          const response = await fetch('http://localhost:8000/api/user-profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setUserProfile(data);
        } else {
          console.error('No access token available.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const userId = userProfile._id; // Assuming the user ID is available

      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/api/user-profiles/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = await response.json();
      setUserProfile(updatedData);
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="about-container">
      {userProfile ? (
        <div className="about-content">
          <div className="about-section">
            <h2>User Profile</h2>
            {isEditing ? (
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </label>
              </div>
            ) : (
              <div>
                <p> {userProfile.name}</p>
                <p> {userProfile.email}</p>
              </div>
            )}
            <div>
              {isEditing ? (
                <button onClick={handleUpdateProfile}>Save Profile</button>
              ) : (
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              )}
              <Link to="/history">View History</Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
