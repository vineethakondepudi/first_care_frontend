import React, { useEffect, useState } from "react";
import "./BuyMedicines.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const BuyMedicines = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.dob) {
        const birthDate = new Date(parsedUser.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        parsedUser.age = age;
      }
      setUser(parsedUser);
    }
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

      <div className="header">
        <h2>Buy Medicines</h2>
      </div>

      <div className="content-wrapper">
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
              <p className="user-info">
                {`${user.firstName} ${user.lastName} ${user.age} ${user.gender}`}
              </p>
            </>
          )}
        </div>

        <div className="right-panel">
          <table className="favorites-table">
            <thead>
              <tr>
                <th>Prescribed Medicine</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyMedicines;
