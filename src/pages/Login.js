import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [otpStep, setOtpStep] = useState(false);

  const handleInitialLogin = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadharNumber: values.aadhar,
          phone: values.mobile,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        message.success('User verified. Sending OTP...');
        await sendOtp(values.aadhar, values.mobile);
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        setOtpStep(true);
      } else {
        message.error(data.message || 'Invalid Aadhaar or mobile number');
      }
    } catch (err) {
      console.error('Login error:', err);
      message.error('Login failed. Please try again.');
    }
  };

  const sendOtp = async (aadhar, phone) => {
    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadharNumber: aadhar, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        message.success(data.message);
      } else {
        message.error(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      message.error('Network error while sending OTP');
    }
  };

  const verifyOtp = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: values.mobile,
          otp: values.otp,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        message.success('OTP Verified. Login successful!');
        navigate('/home');
      } else {
        message.error(data.message || 'OTP verification failed');
      }
    } catch (err) {
      message.error('Error verifying OTP');
    }
  };
  

  const onFinish = async (values) => {
    if (!otpStep) {
      await handleInitialLogin(values);
    } else {
      await verifyOtp(values);
    }
  };

  return (
    <div className="login-container">
      <Row className="login-row">
        <Col span={12} className="logo-section">
          <img src="/fclogo.png" alt="First Care Logo" className="login-logo" />
        </Col>

        <Col span={12} className="form-section">
          <Title level={4}>Patient Log In</Title>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="aadhar"
              rules={[{ required: true, message: 'Please enter your Aadhar ID' }]}
            >
              <Input placeholder="User ID (Aadhar number)" />
            </Form.Item>

            <Form.Item
              name="mobile"
              rules={[{ required: true, message: 'Please enter your mobile number' }]}
            >
              <Input placeholder="Registered Mobile Number" />
            </Form.Item>

            {otpStep && (
              <Form.Item
                name="otp"
                rules={[{ required: true, message: 'Please enter the OTP sent to your mobile' }]}
              >
                <Input placeholder="Enter OTP" />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {otpStep ? 'Verify OTP' : 'Send OTP'}
              </Button>
            </Form.Item>

            <Form.Item>
              <div style={{ textAlign: 'center' }}>
                <span>New user? </span>
                <Link to="/register">Go to Signup</Link>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
