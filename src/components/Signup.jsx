import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FcGoogle } from "react-icons/fc";
import { TbLogin } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";


const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState();
  const [loader, setLoader] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [error, setError] = useState({ name: false, email: false, password: false });

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoader(true);
    if (!name && !email && !password && !profile) {
      setLoader(false)
      setError({ name: true, email: true, password: true, profile: true })
      return;
    }

    if (!name) {
      setLoader(false);
      setError({ name: true })
      return;
    }

    if (!email) {
      setLoader(false);
      setError({ email: true })
      return;
    }

    if (!password) {
      setLoader(false);
      setError({ password: true })
      return;
    }

    if (!profile) {
      setLoader(false);
      setError({ profile: true })
      return;
    }


    try {
      const data = {
        name: name,
        email: email,
        password: password,
        file: profile
      }

      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      if (response.data && response.data.error) {
        console.log(response);
        setLoader(false);
      }

      if (response.data && response.data.accessToken) {
        console.log(response)
        Cookies.set('jwt', `${response.data.accessToken}`, { expires: 1 });
        navigate('/')
        setLoader(false)
        window.location.reload();
      }
    } catch (error) {
      setLoader(false)
    }
  }

  const loginWithGoogle = async () => {
    setGoogleLoader(true);
    window.location.href = `${import.meta.env.VITE_BACKEND}/auth/google`;
  }



  return (
    <>
      <Navbar name='Signup' />
      <div className="lg:md:min-h-screen flex lg:flex-row lg:pb-0 pb-10">
        <div className="lg:flex flex-col justify-center items-center w-1/2 text-center px-10 hidden">
          <h1 className="text-5xl font-bold">Welcome to my<span className='text-green-500'>Blogs</span>!</h1>
          <p className="py-8 text-lg">
            Stay connected and never miss a story! Subscribe to our blog and get the latest posts, exclusive insights, and curated content delivered straight to your inbox. Whether you're looking for expert tips, in-depth articles, or fresh inspiration, we've got you covered. Join our community of readers who love staying informed and engaged—no spam, just quality content. Login and explore new ideas, trends, and conversations!
          </p>
          <p className='text-xl mt-4 font-bold'>Already have a account ?</p>
          <Link to='/login' className='btn btn-linear-gradient bg-[#272643] text-white mt-2 px-6'>Login</Link>
        </div>
        <div className="bg-base-100 lg:mt-0 mt-22 flex flex-col justify-center items-center lg:w-1/2 w-full lg:shadow-2xl">
          <h1 className="text-3xl lg:text-4xl text-[#272643] font-bold underline flex flex-row space-x-2"><span>Signup now!</span><TbLogin size={50} /></h1>
          <form className="flex flex-col w-1/2 justify-center items-center mt-10 space-y-4" onSubmit={handleSignup}>

            <div className="flex flex-col">
              <label className="input floating-label lg:w-94 w-80 flex flex-row space-x-2">
                <IoPerson size={22} className='my-2 text-gray-300' />
                <span className='ml-6'>Enter your name</span>
                <input
                  type="name"
                  placeholder='Enter your name*'
                  value={name}
                  onChange={(e) => { setName(e.target.value), e.target.value ? setError({ name: false }) : setError({ name: true }) }}
                />
              </label>
              {error.name ? <span className='text-red-500 text-xs pt-2 ml-1'>Name is required.</span> : ``}
            </div>

            <div className='flex flex-col'>
              <label className="input floating-label lg:w-94 w-80 flex flex-row">
                < MdEmail size={22} className='my-2 text-gray-400' />
                <span className='ml-6'> Enter your email</span>
                <input
                  type="email"
                  className="pr-10"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value), e.target.value ? setError({ email: false }) : setError({ email: true }) }}
                />
              </label>
              {error.email ? <span className='text-red-500 text-xs pt-2 ml-1'>Email is required.</span> : ``}
            </div>

            <div className='flex flex-col'>
              <label className="input floating-label lg:w-94 w-80 flex flex-row ">
                <FaLock size={20} className='my-2 text-gray-400' />
                <span className='ml-6'>Enter your password</span>
                <input
                  type="password"
                  className="pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value), e.target.value ? setError({ password: false }) : setError({ password: true }) }}
                />
              </label>
              {error.password ? <span className='text-red-500 text-xs pt-2 ml-1'>Password is required.</span> : ``}
            </div>

            <div className='flex flex-col'>
              <label className='mt-2 flex flex-col space-y-1 lg:w-full w-80'>
                <input
                  type="file"
                  className="file-input file-input-sm lg:w-94 w-80"
                  onChange={(e) => setProfile(e.target.files[0])}
                />
                <span className="text-xs">Max file size 1MB</span>
              </label>
              {error.profile ? <span className='text-red-500 text-xs pt-2 ml-1'>Select a profile picture.</span> : ``}
            </div>
            <button className="btn btn-neutral border-none btn-linear-gradient bg-[#272643] lg:w-full w-80 mt-4 text-white" type='submit'>{loader ? <span className="loading loading-spinner loading-md" /> : `Signup`}</button>
            <p className="btn btn-linear-gradient bg-[#272643] lg:w-full w-80 text-white mt-2" onClick={loginWithGoogle}>
              {googleLoader ? <span className="loading loading-spinner loading-md" /> : <span className='flex flex-row justify-center items-center space-x-2'><FcGoogle size={22} /><span>Signup with Google</span></span>}
            </p>
            <div className='text-center mt-2 lg:hidden'>Already a user? <Link className='underline text-primary font-bold' to='/login'>Login</Link></div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
