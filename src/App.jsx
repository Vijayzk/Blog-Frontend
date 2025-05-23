import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup"
import Blogs from "./components/Blogs"
import PostBlog from "./components/PostBlog"
import Login from "./components/Login";
import YourBlog from "./components/YourBlog";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { setUser } from './features/userSlice.js'
import ProtectedRoute from "./ProtectedRoute.jsx";
import Cookies from 'js-cookie';

function App() {

  const dispatch = useDispatch();

  const jwtToken = Cookies.get('jwt');
  console.log(jwtToken)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND}/login/success/`, {
      withCredentials: true
    })
      .then(res => dispatch(setUser(res.data.user)))
      .catch(() => dispatch(setUser(null)));
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

       {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/postblog' element={<PostBlog />} />
          <Route path='/yourblog' element={<YourBlog />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
