import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage/testPage';
import Login from './pages/Login/login';
import Profile from './pages/Login/profile';
import MyPage from './pages/MyPage/mypage';
import FriendsList from './pages/FriendsList/FriendsList';
import SplashScreen from './pages/SplashScreen/splashScreen';
import LoginCallback from './pages/Login/loginCallback';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth" element={<LoginCallback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<TestPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/" element={<SplashScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
