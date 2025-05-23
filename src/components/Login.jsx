import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import Cookies from 'js-cookie';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [error, setError] = useState({ email: false, password: false });

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoader(true);

    if (!email && !password) {
      setLoader(false)
      setError({ email: true, password: true })
      return;
    }

    if(!email){
      setLoader(false);
      setError({email:true});
      return;
    }

    if(!password){
      setLoader(false);
      setError({password:true});
      return;
    }

    try {
      const data = {
        email,
        password
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/login`, data);
      if (response.data && response.data.error) {
        console.log(response.data.error)
        setLoader(false);
      }

      if (response.data && response.data.accessToken) {
        console.log(response)
        Cookies.set('jwt', `${response.data.accessToken}`, { expires: 1 });
        navigate('/')
        //window.location.reload();
      }
    } catch (error) {
      console.log(error)
      setLoader(false);
    }
  }

  const loginWithGoogle = async () => {
    setGoogleLoader(true);
    window.location.href = `${import.meta.env.VITE_BACKEND}/auth/google`;
  }


  return (
    <>
      <Navbar name='login' />
      <div className="md:min-h-screen  lg:min-h-screen flex lg:flex-row-reverse flex-col">
        <div className="lg:flex flex-col justify-center items-center w-1/2 text-center px-10 pb-20 hidden">
          <h1 className="text-5xl font-bold">Welcome to my<span className='text-green-500'>Blogs</span>!</h1>
          <p className="py-6 text-lg">
            Stay connected and never miss a story! Subscribe to our blog and get the latest posts, exclusive insights, and curated content delivered straight to your inbox. Whether you're looking for expert tips, in-depth articles, or fresh inspiration, we've got you covered. Join our community of readers who love staying informed and engaged—no spam, just quality content. Sign up today and be the first to explore new ideas, trends, and conversations!
          </p>
          <p className='text-lg font-bold mt-4'>Don't have account?</p>
          <Link to='/signup' className='btn btn-linear-gradient bg-[#272643] text-white mt-1 px-6'>Signup</Link>
        </div>
        <div className="bg-base-100 flex flex-col lg:mt-0  mt-36 lg:justify-center items-center w-full lg:w-1/2 lg:shadow-2xl">
          <h1 className="text-3xl lg:text-4xl underline font-bold text-[#272643] flex flex-row space-x-2"><span>Login now!</span><TbLogin2 size={50} /></h1>
          <form className="flex flex-col w-1/2 justify-center items-center mt-10 space-y-6" onSubmit={handleLogin}>

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
                  onChange={(e) => {setPassword(e.target.value), e.target.value ? setError({ password: false }) : setError({ password: true })}}
                />
              </label>
              {error.password ? <span className='text-red-500 text-xs pt-2 ml-1'>Password is required.</span> : ``}
            </div>

            <button className="btn btn-neutral border-none btn-linear-gradient bg-[#272643] lg:w-full w-80 mt-4 text-white">{loader ? <span className="loading loading-spinner loading-md" /> : `Login`}</button>
            <p className="btn btn-linear-gradient bg-[#272643] lg:w-full w-80 text-white mt-2" onClick={loginWithGoogle}>
              {googleLoader ? <span className="loading loading-spinner loading-md" /> : <span className='flex flex-row justify-center items-center space-x-2'><FcGoogle size={22} /><span>Login with Google</span></span>}
            </p>
            <div className='text-center mt-4 lg:hidden'>Already a user? <Link className='underline text-primary font-bold' to='/signup'>Signup</Link></div>
          </form>
        </div >
      </div >
    </>
  )
}

export default Login
