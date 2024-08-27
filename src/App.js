import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage/testPage';
import MyPage from './pages/MyPage/mypage';
import SplashScreen from './pages/SplashScreen/splashScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<TestPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/" element={<SplashScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
