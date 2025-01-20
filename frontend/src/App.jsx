import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Wallpaper from './HomePage/HomePage';
import Uploadpage from './UploadPage/Uploadpage';
import Adminlogin from './Admin/Login/AdminLogin';
import Admin from "../src/Admin/Admin";

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Wallpaper />} />
        <Route path="/create" exact element={<Uploadpage/>} />
        <Route path="/admin/login" exact element={<Adminlogin/>} />
        <Route path="/admin/adminpanel" exact element={<Admin/>} />
      </Routes>
    </div>
  );
};

export default App;
