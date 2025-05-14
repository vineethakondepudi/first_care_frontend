import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main style={{ minHeight: '80vh', padding: '20px' }}>{children}</main>
    <Footer />
  </>
);

export default MainLayout;
