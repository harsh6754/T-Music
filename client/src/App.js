import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login } from './components'

const App = () => {

    
    return (
        <div className='
            w-screen
            h-screen
            bg-primary 
            flex justify-center 
            items-center'
        >
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/*' element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
