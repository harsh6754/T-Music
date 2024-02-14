import React from 'react'

import { Logo } from '../assets/img/index'
import { NavLink } from 'react-router-dom'

import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { FaCrown, FaUser } from 'react-icons/fa'

import { useStateValue } from '../context/StateProvider'

const Header = () => {
    const [{ user }, dispatch] = useStateValue();
    return (
        <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
            <NavLink to={"/"}>
                <img src={Logo} alt="Logo" className='w-16' />
            </NavLink>

            <ui className='flex items-center justify-center ml-7'>
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
                        Contact Us
                    </NavLink>
                </li>

            </ui>

            <div className='flex items-center ml-auto cursor-pointer gap-2 relative'>
                <img src={user?.user?.imageURL} className='w-12 h-12 -min-w-[44px] object-cover rounded-full shadow-lg' alt="" referrerPolicy='no-referrer' />
                <div className="flex flex-col">
                    <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{user?.user?.name}</p>
                    <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Premium Member <FaCrown className="text-sm -ml-1 text-yellow-500" /></p>
                </div>
                <div className=" absolute z-10 top-12 right-0 w-275 gap-2 p-3 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col">
                    <NavLink to={'/userProfile'}>
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>

                    </NavLink>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>My Favourites</p>
                    <hr />
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Logout</p>
                </div>
            </div>
        </header>
    )
}

export default Header