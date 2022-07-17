import { ReactElement } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import MyAccount from './pages/MyAccount';
import { useSelector } from 'react-redux';
import ImageInfo from './components/ImageInfo';
import ResponsiveAppBar from './components/Navbar';

const App = (): ReactElement => {
  const isLoggedIn = useSelector((state: any) => state?.flicker?.isLoggedIn);
  return (
    <>
    <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/photos/:id/:owner" element={<ImageInfo/>}/>
        <Route path="/user" element={ isLoggedIn ? <MyAccount /> : <Navigate to="/" /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>
  );
}

export default App;
