import React from 'react';

const AuthLayout = ({ children }) => (
  <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {children}
  </div>
);

export default AuthLayout;
