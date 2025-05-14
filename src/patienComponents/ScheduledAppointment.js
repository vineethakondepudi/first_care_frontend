import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import './ScheduledAppointments.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const ScheduledAppointment = () => {
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

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Appointment With', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];
  const data = [
    {
      key: '1',
      date: '24/05/2025; 11.30 AM',
      doctor: 'Dr. Manas Panigrahi',
      status: 'Scheduled',
    },
  ];

  return (
    <div className="appointment-container">
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
      <div className="appointment-header">Scheduled Appointment</div>

      <div className="appointment-section">
        {/* Left: Profile Info */}
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

        {/* Right: Table and Back Button */}
        <div className="right-panel">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            className="appointment-table"
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduledAppointment;
