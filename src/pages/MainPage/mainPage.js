import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import MainMemo from '../../components/mainMemo/MainMemo';

const MainPage = () => {
  return (
    <div className="relative">
      <Header />
      <MainMemo />
      <Calendar />
      <Footer />
    </div>
  );
};

export default MainPage;
