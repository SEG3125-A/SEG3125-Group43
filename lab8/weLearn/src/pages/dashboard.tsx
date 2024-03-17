/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { signUserOut } from '../firebase/utils';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        console.log('logout clicked');
        signUserOut(setLoading);
    }
    return (
        <div>
            <button className='btn btn-primary' onClick={() => {
                handleLogout();
            }}>LOGOUT</button>
        </div>
    )
}