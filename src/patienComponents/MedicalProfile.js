import React, { useEffect, useState } from 'react';
import './MedicalProfile.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const MedicalProfile = () => {

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
        <div className="medical-profile-container">
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
            <div className="medical-profile-header">Medical Profile</div>

            <div className="medical-profile-content">
                {/* Left: Image and Name */}
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
                {/* Right: Description and Table */}
                <div className="profile-right">
                    <p className="medical-description">
                        Ravi Kanth, 29 Year old male is leading a normal healthy life until a year ago when he was admitted with severe complaint of heart burn.
                        <br />
                        Upon diagnosis he was found to be a borderline case of diabetics and hypertension.
                        <br />
                        Further he stands to have high risk of cardiac complaint.
                        <br />
                        Since then he is on regular medication for Diabetics and Hypertension.
                        <br />
                        The family details of medical complications are not recorded.
                    </p>

                    <table className="medical-table">
                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Sex</td><td>{user?.gender || '—'}</td></tr>
                            <tr><td>Height</td><td>{user?.height || '—'}</td></tr>
                            <tr><td>Weight</td><td>{user?.weight || '—'}</td></tr>
                            <tr><td>Blood Group</td><td>{user?.BloodGroup || '—'}</td></tr>
                            <tr><td>Diabetics</td><td>{user?.diabetics || '—'}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MedicalProfile;
