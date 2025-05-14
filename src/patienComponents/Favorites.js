import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Favorites.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Favorites = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load user data
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.dob) {
        const birthDate = new Date(parsedUser.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        parsedUser.age = age;
      }
      setUser(parsedUser);
    }
  }, []);

  // Fetch favorite appointments
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/patientNewAppointment");
        const favoriteDoctors = response.data.filter((item) => item.isFavorite === true);
        setFavorites(favoriteDoctors);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="favorites-container">
       <div className="back-button-container">
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate('/home')}
              style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
            >
              Back
            </Button>
          </div>
      {/* Full-width Header */}
      <div className="header">
        <h2>Favorites</h2>
      </div>
  
      {/* Below Header: Left and Right Split */}
      <div className="content-section">
        {/* Left Panel */}
        <div className="left-panel">
          {user && (
            <>
              <img
                src={
                  user.image
                    ? `http://localhost:5000/${user.image.replace(/\\/g, "/")}`
                    : "/default-user.png"
                }
                alt="User"
                className="user-photo"
              />
              <p className="user-info">
                {`${user.firstName} ${user.lastName} ${user.age} ${user.gender}`}
              </p>
            </>
          )}
        </div>
  
        {/* Right Panel */}
        <div className="right-panel">
         
  
          <div className="table-section">
            <table className="favorites-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Appointment</th>
                </tr>
              </thead>
              <tbody>
                {favorites.length > 0 ? (
                  favorites.map((doctor) => (
                    <tr key={doctor._id}>
                      <td>{doctor.doctorName}</td>
                      <td>{doctor.requestAppointment}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No favorites found.</td>
                  </tr>
                )}
              </tbody>
            </table>
  
            <table className="favorites-table">
              <thead>
                <tr>
                  <th>Hospital Name</th>
                  <th>Appointment</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Favorites;
