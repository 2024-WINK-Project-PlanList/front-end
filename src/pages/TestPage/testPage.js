import React from 'react';
import { Button } from '@mui/material';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const TestPage = () => {
  return (
    <div>
      <Header />
      <div className="text-5xl text-amber-950"> gkdl</div>
      <Button>Hello world </Button>
      <Footer />
    </div>
  );
};
export default TestPage;
