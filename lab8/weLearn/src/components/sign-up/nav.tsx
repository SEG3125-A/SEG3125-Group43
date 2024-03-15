import React from 'react'
import Profile from '../header/profile'

type HeaderProps = {
    type: string
}

const Header: React.FC<HeaderProps> = ({type}) => {
    return (
        <div className='flex justify-between items-center h-18 py-1 px-6 border-b-2'>
            <h1 className='text-5xl flex text-black font-extrabold font-montserrat'><img className='mr-3' src="/logo.svg" alt="" />weLearn</h1>
            {type === 'signup' && <a className='absolute right-[100px] text-primary-link-purp' href='/login'>Login</a>}
            {type === 'login' && <a className='absolute right-[100px] text-primary-link-purp' href='/signup'>Signup</a>}
            <Profile/>
        </div>
    )
}

export default Header
