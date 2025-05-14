import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Select, Table, Button, message } from 'antd';
import './NewAppointment.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const NewAppointment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [doctorData, setDoctorData] = useState([]);

  const [dropdownData, setDropdownData] = useState({
    specialization: [],
    location: [],
    language: [],
    feeRange: [],
    availability: [],
  });

  // Fetch user data from localStorage
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

  // Fetch dropdown data from backend
  useEffect(() => {
    axios.get('http://localhost:5000/dropdown-options')
      .then((res) => {
        setDropdownData(res.data);
      })
      .catch((err) => {
        message.error('Failed to fetch dropdown options');
        console.error(err);
      });
  }, []);


  // Fetch doctors list data
  useEffect(() => {
    axios.get('http://localhost:5000/patientNewAppointment')
      .then((res) => {
        const formattedData = res.data.map((item) => ({
           key: item._id,
  id: item._id,
          name: item.doctorName,
          fee: item.fee,
          availability: item.availability,
          time: item.time,
          request: item.requestAppointment,
          isFavorite: item.isFavorite,
        }));
        setDoctorData(formattedData);
      })
      .catch((err) => {
        message.error('Failed to fetch doctor appointment data');
        console.error(err);
      });
  }, []);
  
const handleFavoriteToggle = (id, newStatus) => {
  axios.put(`http://localhost:5000/doctor/${id}/favorite`, { isFavorite: newStatus })
    .then((res) => {
      setDoctorData((prevData) =>
        prevData.map((doctor) =>
          doctor.id === id ? { ...doctor, isFavorite: newStatus } : doctor
        )
      );
      message.success('Favorite status updated');
    })
    .catch((err) => {
      message.error('Failed to update favorite status');
      console.error(err);
    });
};

  const columns = [
    {
      title: 'Doctor Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'View Profile',
      dataIndex: 'view',
      key: 'view',
      render: () => <Button type="link">View</Button>,
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Request Appointment',
      dataIndex: 'request',
      key: 'request',
      render: (text, record) => {
        const appointmentStatus = record.request;
  
        if (appointmentStatus === 'Available') {
          return <Button type="primary">Request</Button>;
        } else if (appointmentStatus === 'Pending') {
          return <Button type="default" disabled>Pending</Button>;
        } else if (appointmentStatus === 'Full') {
          return <Button type="default" disabled>Full</Button>;
        } else {
          return <Button type="default" disabled>No Slots</Button>;
        }
      },  
    },
    {
      title: 'Add to Favorite',
      dataIndex: 'favorite',
      key: 'favorite',
      render: (_, record) => (
        <Button
          type="text"
          onClick={() => handleFavoriteToggle(record.id, !record.isFavorite)}
          style={{ color: record.isFavorite ? 'red' : 'gray' }}
        >
          ♥
        </Button>
      ),
    }
    
  ];


  return (
    <div className="appointment-container">
      
    <Card className="appointment-card">
    <div className="back-button-container" style={{ marginBottom: '16px' }}>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={() => navigate('/home')}
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          Back
        </Button>
      </div>
  <Title level={3} className="new-appointment-title">New Appointment</Title>

  <Row gutter={24}>
    {/* Left: User Profile */}
    <Col xs={24} md={8} className="left-profile">
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
    </Col>

    {/* Right: Filters & Table */}
    <Col xs={24} md={16} className="right-content">
    

      <Row gutter={16} className="filter-row">
        <Col span={12}>
          <Select placeholder="Specialization" className="filter-select" allowClear>
            {dropdownData.specialization.map((item, index) => (
              <Option key={index} value={item}>{item}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Select placeholder="Location" className="filter-select" allowClear>
            {dropdownData.location.map((item, index) => (
              <Option key={index} value={item}>{item}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Select placeholder="Language" className="filter-select" allowClear>
            {dropdownData.language.map((item, index) => (
              <Option key={index} value={item}>{item}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Select placeholder="Fee Range" className="filter-select" allowClear>
            {dropdownData.feeRange.map((item, index) => (
              <Option key={index} value={item}>{item}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Select placeholder="Availability" className="filter-select" allowClear>
            {dropdownData.availability.map((item, index) => (
              <Option key={index} value={item}>{item}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={doctorData}
        pagination={false}
        bordered
        className="doctor-table"
      />
    </Col>
  </Row>
</Card>

    </div>
  );
};

export default NewAppointment;
