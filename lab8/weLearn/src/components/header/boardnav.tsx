/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import ProfilePicture from './profilePicture'
import { useTranslation } from 'react-i18next';

import { getCurrentUser, getProfilePicture } from '../../firebase/utils';
import { User } from 'firebase/auth';

const Header = () => {
    const { t } = useTranslation();

    const { i18n } = useTranslation();

    const [profileURL, setProfileURL] = React.useState<string | null>(null);

    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            setUser(getCurrentUser());
            if (user) {
                const picture = await getProfilePicture(user.uid);
                setProfileURL(picture);
                console.log(profileURL)
            }
        };

        fetchProfilePicture();
    }, [user]);

    const getUserLanguage = () => {
        const language = navigator.language;
    
        if (language.includes('fr')) return 'FRA';
        if (language.includes('es')) return 'SPA';
        return 'ENG';
    };

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        const languageToUse = savedLanguage || getUserLanguage();
        i18n.changeLanguage(languageToUse);
    }, [])

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const themeToUse = savedTheme ? savedTheme : 'light';
        if (themeToUse !== (document.documentElement.classList.contains('dark') ? 'dark' : 'light')) {
            toggleTheme();
        }
    }, [])

    useEffect(() => {
        document.documentElement.lang = i18n.language;
      }, [i18n.language]);

    return (
        <div className='flex justify-between items-center ml-20 pr-32 h-[80px] py-1 px-8 absolute w-screen bg-dark-card-bg z-[100]'>
            <h1 className='text-5xl p-2 flex text-white font-extrabold font-montserrat'><img className='mr-3 ' src="/logo-white.svg" alt="weLearn" /><a href="/">weLearn</a></h1>
            <div className='flex items-center space-x-4'>
                <div className='flex flex-row items-center justify-between gap-4'>
                    <p className='text-white '>{user?.displayName}</p>
                    <ProfilePicture />
                </div>
            </div>
        </div>
    )
}

export default Header
