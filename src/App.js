import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage/testPage';
import Login from './pages/Login/login';
import Profile from './pages/Login/profile';
import MyPage from './pages/MyPage/mypage';
import FriendsList from './pages/FriendsList/FriendsList';
import TodoList from './pages/TodoList/todoList';
import SplashScreen from './pages/SplashScreen/splashScreen';
import LoginCallback from './pages/Login/loginCallback';
import MainPage from './pages/MainPage/mainPage';
import SharedCalendar from './pages/SharedCalendar/calendarList';
import CalendarDetail from './pages/SharedCalendar/calendarDetail';
import PlayList from './pages/PlayList/playList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth" element={<LoginCallback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<TestPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/todoList/:date" element={<TodoList />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/calendar" element={<SharedCalendar />} />
          <Route path="/calendar/:id" element={<CalendarDetail />} />
          <Route path="/playList" element={<PlayList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
