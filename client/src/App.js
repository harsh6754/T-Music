import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Dashboard, Home, Login, Contact, Musics, Premium, AboutUs, Profiles, Header, MusicPlayer } from './components'
import { app } from './config/firebase.config'
import { getAuth, onIdTokenChanged } from 'firebase/auth'
import { AnimatePresence, motion } from 'framer-motion'
import { validateUser } from './api'

import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'
import MusicStatic from './pages/MusicStatic'


const App = () => {

    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const [{ user, isSongPlaying }, dispatch] = useStateValue();

    const [auth, setAuth] = useState(window.localStorage.getItem("auth") ?? "false")

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    // console.log(token)
                    validateUser(token).then((data) => {
                        // console.log(data)
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        })

                    })
                    window.localStorage.setItem("auth", "true")
                })
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                })
                navigate("/login")
            }
        })
    }, [])
    return (
        <AnimatePresence mode="wait">
            <div className='
             h-auto
             min-w-[680px]
            bg-primary 
            flex justify-center 
            items-center'
            >
                <Routes>
                    <Route path='/login' element={<Login setAuth={setAuth} />} />
                    <Route path='/*' element={<Home />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/musics' element={<Musics />} />
                    <Route path='/premium' element={<Premium />} />
                    <Route path='/about' element={<AboutUs />} />
                    <Route path='/userProfile' element={<Profiles />} />
                    <Route path='/dashboard/*' element={<Dashboard />} />
                    <Route path='/tmusics' element={<MusicStatic />} />
                </Routes>

                {isSongPlaying && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center border border-gray-400 rounded-lg `}
                    >
                        <MusicPlayer />
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    )
}

export default App
