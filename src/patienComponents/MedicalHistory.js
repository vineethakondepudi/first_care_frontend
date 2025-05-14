import React, { useEffect, useState } from 'react';
import './MedicalHistory.css';
import { FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
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

  const historyData = [
    { date: '2024-10-01', summary: 'Routine check-up', pdf: true },
    { date: '2024-09-14', summary: 'Diabetes screening', pdf: false },
    { date: '2024-08-22', summary: 'Cardiac evaluation', pdf: true },
  ];

  return (
    <div>
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
      <div className="header-box">Medical History</div>
 
      <div className="medical-history-container">
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
                {`${user.firstName} ${user.lastName}`}<br />
                Age: {user.age}<br />
                Gender: {user.gender}
              </p>
            </>
          )}
        </div>

        <div className="right-section">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Medical Episode Summary</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.date}</td>
                  <td>{entry.summary}</td>
                  <td>
                    {entry.pdf ? <FaFilePdf className="pdf-icon" /> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
