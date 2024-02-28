import React, { useState } from 'react'

import { Logo } from '../assets/img/index'
import { NavLink } from 'react-router-dom'

import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { FaCrown } from 'react-icons/fa'
//import { AiOutlineUser, AiOutlineHeart, AiOutlineLogout } from 'react-icons/ai';
import { FaUser } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";


import { useStateValue } from '../context/StateProvider'
//import {getApp} from 'firebase/app'
//import {firebaseAuth} from '../../../server/config/firebase.config'
import { getAuth } from 'firebase/auth'
import { app } from "../config/firebase.config"
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

const Header = () => {
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);
    const navigate = useNavigate();
    const logOut = () => {
        const firebaseAuth = getAuth(app)
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false")
        }).catch((e) => console.log(e));
        navigate("/login", { replace: true })
    }
    return (
        <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
            <NavLink to={"/"}>
                <img src={Logo} alt="Logo" className='w-16' />
            </NavLink>

            <ul className='flex items-center justify-center ml-8'>
                <li className='mx-5 text-lg list-none'>
                    <NavLink to={'/home'} className={({ isActive }) =>
                        isActive ? isActiveStyles : isNotActiveStyles
                    }>
                        Home
                    </NavLink>
                </li>

                <li className='mx-5 text-lg list-none'>
                    <NavLink to={'/musics'} className={({ isActive }) =>
                        isActive ? isActiveStyles : isNotActiveStyles
                    } >
                        Musics
                    </NavLink>
                </li>

                <li className='mx-5 text-lg list-none'>
                    <NavLink to={'/premium'} className={({ isActive }) =>
                        isActive ? isActiveStyles : isNotActiveStyles
                    } >
                        Premium
                    </NavLink>
                </li>

                <li className='mx-5 text-lg list-none'>
                    <NavLink to={'/contact'} className={({ isActive }) =>
                        isActive ? isActiveStyles : isNotActiveStyles
                    } >
                        Contact
                    </NavLink>
                </li>

                <li className="mx-5 text-lg list-none">
                    <NavLink to={'/about'} className={({ isActive }) =>
                        isActive ? isActiveStyles : isNotActiveStyles
                    }>
                        About Us
                    </NavLink>

                </li>

            </ul>

            <div
                onMouseEnter={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}
                className='flex items-center ml-auto cursor-pointer gap-2 relative'>
                <img src={user?.user?.imageURL} className='w-12 h-12 -min-w-[44px] object-cover rounded-full shadow-lg' alt="" referrerPolicy='no-referrer' />
                <div className="flex flex-col">
                    <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
                    <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Premium Member <FaCrown className="text-sm -ml-1 text-yellow-500" /></p>
                </div>
                {isMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute z-10 top-12 right-0 w-275 gap-2 p-3 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col">
                        <NavLink to={'/userProfile'} className='flex items-center'>
                            <FaUser size={20} className='mr-2' />
                            <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>
                        </NavLink>
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out flex items-center'>
                            <MdFavorite size={20} className='mr-2' />
                            My Favourites
                        </p>
                        <hr />
                        {
                            user?.user?.role === "admin" && (
                                <>
                                    <NavLink to={'/dashboard/home'}>
                                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out flex items-center'>
                                            <MdDashboard size={20} className='mr-2' />
                                            Dashboard
                                        </p>
                                    </NavLink>
                                    <hr />
                                </>
                            )
                        }
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out flex items-center' onClick={logOut}>
                            <IoMdLogOut size={20} className='mr-2' />
                            Sign Out
                        </p>
                    </motion.div>
                )}
            </div>
        </header>
    )
}

export default Header