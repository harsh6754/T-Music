import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home, Login } from './components'
import { app } from './config/firebase.config'
import { getAuth, onIdTokenChanged } from 'firebase/auth'

import { AnimatePresence } from 'framer-motion';


const App = () => {

    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [auth, setAuth] = useState(window.localStorage.getItem("auth") ?? "false")

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    console.log(token)
                    window.localStorage.setItem("auth", "true")
                })
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                navigate("/login")
            }
        })
    }, [])
    return (
        <AnimatePresence>
            <div className='
            w-screen
            h-screen
            bg-primary 
            flex justify-center 
            items-center'
            >
                <Routes>
                    <Route path='/login' element={<Login setAuth={setAuth} />} />
                    <Route path='/*' element={<Home />} />
                </Routes>
            </div>
        </AnimatePresence>
    )
}

export default App
