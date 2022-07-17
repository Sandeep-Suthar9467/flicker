import { ReactElement } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import MyAccount from './pages/MyAccount';
import { useSelector } from 'react-redux';

const App = (): ReactElement => {
  const isLoggedIn = useSelector((state: any) => state?.flicker?.isLoggedIn);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/user" element={ isLoggedIn ? <MyAccount /> : <Navigate to="/" /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
