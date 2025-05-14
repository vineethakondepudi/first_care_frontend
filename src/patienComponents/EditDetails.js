import React, { useEffect, useState } from 'react'; 
import './EditDetails.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const EditDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    email: '',
    spouseName: '',
    EmergencyContactNumber: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Calculate age from dob
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
      setFormData({
        phone: parsedUser.phone || '',
        address: parsedUser.address || '',
        email: parsedUser.email || '',
        spouseName: parsedUser.spouseName || '',
        EmergencyContactNumber: parsedUser.EmergencyContactNumber || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/register/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, aadharNumber: user.aadharNumber })
      });

      const data = await response.json();

      if (response.ok) {
        alert('User details updated successfully');
        localStorage.setItem('loggedInUser', JSON.stringify(data.data)); // Update localStorage
        setUser(data.data); // Refresh local state
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (error) {
      alert('Error updating user details');
      console.error(error);
    }
  };

  return (
    <div className="edit-details-wrapper">
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
      <h2 className="header">Edit Details</h2>

      <div className="content-section">
        {/* Left Side: Profile */}
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

        {/* Right Side: Form Table */}
        <div className="details-right">
          <table className="details-table">
            <tbody>
              <tr>
                <td>Mobile Number</td>
                <td><input type="text" name="phone" value={formData.phone} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Communication Address</td>
                <td><input type="text" name="address" value={formData.address} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>E Mail</td>
                <td><input type="email" name="email" value={formData.email} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Spouse Name</td>
                <td><input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Emergency Contact Person</td>
                <td><input type="text" name="EmergencyContactNumber" value={formData.EmergencyContactNumber} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
          <div className="update-button-container">
  <button onClick={handleSubmit} className="submit-button">Update Details</button>
</div>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
