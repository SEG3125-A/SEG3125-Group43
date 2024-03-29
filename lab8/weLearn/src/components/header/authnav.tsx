/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import ProfilePicture from './profilePicture'
import { useTranslation } from 'react-i18next';

type HeaderProps = {
    type: string
}

const Header: React.FC<HeaderProps> = ({type}) => {
    const { t } = useTranslation();
    let savedTheme = "";

    useEffect(() => {
        savedTheme = localStorage.getItem('theme')!;
    }, [savedTheme])
    return (
        <div className='flex justify-between items-center h-18 py-1 px-6 border-b-2 dark:border-dark-card-bg z-[100]'>
            <h1 className='text-5xl p-2 flex text-black dark:text-white font-extrabold font-montserrat'><img className='mr-3 ' src={savedTheme === 'light' ? '/logo.svg' : '/logo-white.svg'} alt="" /><a href="/">weLearn</a></h1>
            {type === 'signup' ? <a className='absolute right-[100px] text-primary-marine-blue dark:text-primary-link-purp' href='/login'>{t('Login')}</a> : null}
            {type === 'login' ? <a className='absolute right-[100px] text-primary-marine-blue dark:text-primary-link-purp' href='/signup'>{t('Signup')}</a> : null}
            <div className='h-profile-sm w-profile-sm'>
                <ProfilePicture />
            </div>
        </div>
    )
}

export default Header
