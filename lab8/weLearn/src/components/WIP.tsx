/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { signUserOut } from '../firebase/utils';

export const WIP = () => {
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        console.log('logout clicked');
        signUserOut(setLoading);
    }
    return (
        <div className='fixed text-center align-center justify-center h-screen w-screen flex text-4xl text-white bg-dark-page-bg'>
            <h1 className='absolute top-1/2 -mt-10'>Work in progress</h1>
            <button className='btn btn-primary top-1/2 fixed mt-8' onClick={() => {
                handleLogout();
            }}>LOGOUT</button>
        </div>
    )
}