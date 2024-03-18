import React from 'react'
import ProfilePicture from './profilePicture'
import { useTranslation } from 'react-i18next';

type SidebarProps = {
    type: string
}

const Sidebar: React.FC<SidebarProps> = ({type}) => {
    const { t } = useTranslation();
    return (
        <div className='flex justify-between items-center h-18 py-1 px-6 border-b-2 dark:border-dark-card-bg z-[100]'>
            <h1 className='text-5xl p-2 flex text-black dark:text-white font-extrabold font-montserrat'><img className='mr-3 ' src="/logo.svg" alt="" />weLearn</h1>
            {type === 'signup' && <a className='absolute right-[100px] text-primary-marine-blue dark:text-primary-link-purp' href='/login'>{t('Login')}</a>}
            {type === 'login' && <a className='absolute right-[100px] text-primary-marine-blue dark:text-primary-link-purp' href='/signup'>{t('Signup')}</a>}
            <div className='h-profile-sm w-profile-sm'>
                <ProfilePicture />
            </div>
        </div>
    )
}

export default Sidebar