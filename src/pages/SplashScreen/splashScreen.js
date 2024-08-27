import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PL from '../../assets/splashscreen/PL.svg';
import A from '../../assets/splashscreen/A.svg';
import NLIS from '../../assets/splashscreen/NLIS.svg';
import T from '../../assets/splashscreen/T.svg';

const SplashScreen = () => {
  const [showA, setShowA] = useState(true);
  const [showRest, setShowRest] = useState(false);
  const [aPosition, setAPosition] = useState('initial');
  const navigate = useNavigate();

  useEffect(() => {
    const aTimer = setTimeout(() => {
      setShowA(false);
      setShowRest(true);
      setAPosition('moved');
    }, 1000);

    const logoTimer = setTimeout(() => {
      navigate('/login');
    }, 4000);

    return () => {
      clearTimeout(aTimer);
      clearTimeout(logoTimer);
    };
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen relative">
      <img
        src={A}
        alt="A"
        className={`h-11 ${
          showA ? 'animate-shake' : ''
        } transition-transform duration-500 ${
          aPosition === 'moved' ? '-translate-x-9' : ''
        }`}
      />
      {showRest && (
        <div className="absolute flex items-center space-x-8">
          <div className="flex items-center">
            <img src={PL} alt="PL" className="w-13 animate-fade-in" />
          </div>
          <div className="flex items-center">
            <img src={NLIS} alt="NLIS" className="w-24 animate-fade-in" />
            <img src={T} alt="T" className="w-6 animate-fade-in" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
