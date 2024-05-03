import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

import './App.css';
import {
  BrowserRouter as Router, Routes, Route,
  Navigate, Outlet
} from 'react-router-dom';
import Product from './screem/Product'
import Demo from './screem/Demo';
import Home from './screem/Home';
import Update_product from './screem/Update_product';
import Add_product from './screem/Add_product';
import History from './screem/History';


function App() {
// đọc thông tin user từ localStorage
const getUserInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem('user');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
}
// lưu thông tin user vào localStorage
const saveUserInfoToLocalStorage = (userInfo) => {
  if (!userInfo) {
    localStorage.removeItem('user');
    setUser(null);
  } else {
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  }
}
// state user
const [user, setUser] = useState(getUserInfoFromLocalStorage());

// các route không cần login
const PublicRoute = () => {
  if (user) { // nếu đã login thì cho vào trang chủ
    return <Navigate to="/home" />
  }
  return <Outlet /> // cho đi tiếp
}

// các route cần login
const PrivateRoute = () => {
  if (!user) { // nếu chưa login thì cho vào trang login
    return <Navigate to="/" />
  }
  return <Outlet />
}

  return (

    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={"/"} element={<Demo />} />

        </Route>
        <Route element={<PrivateRoute />}>
        <Route path={"/product"} element={<Product />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/update_product"} element={<Update_product />} />
        <Route path={"/add_product"} element={<Add_product />} />
        <Route path={"/history"} element={<History />} />

        </Route>

      </Routes>

    </Router>

  );
}

export default App;
