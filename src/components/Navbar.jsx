import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from '../features/userSlice.js'

const Navbar = ({name}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);

    const logoutWithGoogle = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND}/auth/logout`, {
            withCredentials: true
        }).then((res) => {
            //console.log(res)
            dispatch(clearUser());
            navigate('/signup');
        });
    };

    return (
        <>
            <div className="navbar bg-base-100 sticky top-0 left-0 right-0 z-50">
                <div className="navbar-start cursor-pointer" onClick={()=>navigate('/')}>
                    <img className='w-10 h-10 mt-2 ml-2 lg:mt-2 lg:ml-6' src={logo} alt="myblogs" />
                    <h1 className="text-lg lg:text-xl text-black ml-2 font-bold">my<span className='text-green-500 font-bold'>Blogs</span></h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {
                        user ? <ul className="flex justify-between gap-16 py-4 px-1 text-lg">
                            <Link to='/' className='hover:underline transition cursor-pointer hover:text-green-500'>Home</Link>
                            <Link to='/blogs' className='hover:underline transition cursor-pointer hover:text-green-500'>Blogs</Link>
                            <Link to='/postblog' className='hover:underline transition cursor-pointer hover:text-green-500'>Post Blog</Link>
                            <Link to='/yourblog' className='hover:underline transition cursor-pointer hover:text-green-500'>Your Blogs</Link>
                        </ul> : ``
                    }
                </div>
                <div className="navbar-end">
                    {
                        !user ?
                            (name ? `` : <Link className="btn btn-sm lg:btn-md text-white shadow-md hover:bg-[#393861] bg-[#272643] rounded-lg" to='/signup'>
                                Signup
                            </Link>)
                            :
                            <div className='flex space-x-4'>
                                <img
                                    className='w-10 h-10 rounded-full border-2 border-green-500 p-0.5'
                                    alt="Img"
                                    src={user.user === undefined ? user?.pictureUrl : user?.user?.pictureUrl}
                                />
                                <button className='btn bg-red-600 logout-linear-gradient text-white btn-sm mt-1 lg:btn-md lg:mt-0' onClick={logoutWithGoogle}>Logout</button>
                            </div>
                    }

                    {
                        user &&
                        <div className="dropdown ml-2">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg></div>
                            <ul
                                tabIndex={0}
                                class="menu menu-sm dropdown-content bg-base-100 rounded-box mt-5 -mx-48 w-60 p-4 shadow text-lg">
                                <Link to='/' className='hover:underline transition cursor-pointer'>Home</Link>
                                <Link to='/blogs' className='hover:underline transition cursor-pointer'>Blogs</Link>
                                <Link to='/postblog' className='hover:underline transition cursor-pointer'>Post Blog</Link>
                                <Link to='/yourblog' className='hover:underline transition cursor-pointer'>Your Blogs</Link>
                            </ul>
                        </div>

                    }
                </div>
            </div>
        </>
    )
}

export default Navbar
