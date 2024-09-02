import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage/testPage';
import MyPage from './pages/MyPage/mypage';
import TodoList from './pages/TodoList/todoList';
import SplashScreen from './pages/SplashScreen/splashScreen';
import LoginCallback from './pages/Login/loginCallback';
import MainPage from './pages/MainPage/mainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<TestPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/todoList/:date" element={<TodoList />} />
          <Route path="/" element={<SplashScreen />} />
          <Route path="/mainPage" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
