import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage/testPage';
import Login from './pages/Login/login';
import Profile from './pages/Login/profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
