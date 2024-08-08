import React from 'react';
import { Button } from '@mui/material';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const TestPage = () => {
  return (
    <div>
      <Header location={'todolist'} />

      <div className={'text-center flex justify-center'}>
        <div>
          <div className="text-5xl">Hi</div>
          <div className={'border w-fit'}>
            <Button>Hello world </Button>
          </div>
        </div>
      </div>

      <Footer location={'todolist'} />
    </div>
  );
};
export default TestPage;
