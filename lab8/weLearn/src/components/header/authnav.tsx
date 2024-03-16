import React from 'react'
import ProfilePicture from './profilePicture'

type HeaderProps = {
    type: string
}

const Header: React.FC<HeaderProps> = ({type}) => {
    return (
        <div className='flex justify-between items-center h-18 py-1 px-6 border-b-2 z-[100]'>
            <h1 className='text-5xl p-2 flex text-black font-extrabold font-montserrat'><img className='mr-3' src="/logo.svg" alt="" />weLearn</h1>
            {type === 'signup' && <a className='absolute right-[100px] text-primary-link-purp' href='/login'>Login</a>}
            {type === 'login' && <a className='absolute right-[100px] text-primary-link-purp' href='/signup'>Signup</a>}
            <div className='h-profile-sm w-profile-sm'>
                <ProfilePicture />
            </div>
        </div>
    )
}

export default Header
