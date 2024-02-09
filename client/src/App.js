import React from 'react'
import { Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <div className='
            w-screen
            h-screen
            bg-blue-400 
            flex justify-center 
            items-center'
        >
            <Routes>
                <Route path='/login' />
            </Routes>
        </div>
    )
}

export default App
