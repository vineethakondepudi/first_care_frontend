import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/';
  };

  return (
    <header
      style={{
        background: '#006d77', // hospital theme color
        padding: '0.4rem 1rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <img
        src="/fclogo.png"
        alt="Logo"
        style={{ height: '40px', objectFit: 'contain' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>
          Hospital Management System
        </h1>
        <Button
          style={{ backgroundColor: '#83c5be', borderColor: '#83c5be', color: '#fff' }}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
