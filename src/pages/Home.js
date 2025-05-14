import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      // setUser(JSON.parse(storedUser)); // Calculate age from dob
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

  return (
    <div className="home-container">
     
      <div className="left-panel">
        {user && (
          <>
            <img
              src={
                user.image
                  ? `http://localhost:5000/${user.image.replace(/\\/g, '/')}`
                  : '/default-user.png'
              }
              alt="User"
              className="user-photo"
            />
            <p className="user-info">{`${user.firstName} ${user.lastName} ${user.age} ${user.gender}`}</p>
          </>
        )}
      </div>

      <div className="right-panel">
      <div className="back-button-container">
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate('/')}
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          >
            Back
          </Button>
        </div>
        <div className="home-title">Patient Home Screen</div>
        <div className="button-grid">
  <button className="btn btn-primary" onClick={() => navigate('/edit-details')}>
    Edit Details
  </button>
  
  <button className="btn btn-info" onClick={() => navigate('/medical-profile')}>
    Medical Profile
  </button>
  
  <button className="btn btn-calm" onClick={() => navigate('/medical-history')}>
    Medical History
  </button>
  
  <button className="btn btn-secondary" onClick={() => navigate('/favorites')}>
    Favorites
  </button>
  
  <button className="btn btn-success" onClick={() => navigate('/scheduled-appointments')}>
    Scheduled Appointments
  </button>
  
  <button className="btn btn-warning" onClick={() => navigate('/new-appointments')}>
    New Appointments
  </button>
  
  <button className="btn btn-danger" onClick={() => navigate('/buy-medicines')}>
    Buy Medicines
  </button>
  
  <button className="btn btn-light" onClick={() => navigate('/buy-products')}>
    Buy Products
  </button>
  
  <button className="btn btn-calm" onClick={() => navigate('/book-service')}>
    Book a Service
  </button>
</div>

      </div>
    </div>
  );
};

export default Home;
