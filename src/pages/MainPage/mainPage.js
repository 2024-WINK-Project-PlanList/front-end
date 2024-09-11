import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import MainMemo from '../../components/mainMemo/MainMemo';

const MainPage = () => {
  return (
    <div className="relative pt-[4%]">
      <Header />
      <MainMemo />
      <div className="mt-2">
        <Calendar />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
