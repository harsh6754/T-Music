import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Dashboard, Home, Login } from './components'
import { app } from './config/firebase.config'
import { getAuth, onIdTokenChanged } from 'firebase/auth'

// import { AnimatePresence } from 'framer-motion';
import { AnimatePresence } from 'framer-motion'
import { validateUser } from './api'

import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'


const App = () => {

    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [{ user }, dispatch] = useStateValue();

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
                    <Route path='/dashboard/*' element={<Dashboard/>}/>
                </Routes>
            </div>
        </AnimatePresence>
    )
}

export default App
