import React, { useEffect } from 'react'
import ProfilePicture from './profilePicture'
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faMoon } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { t } = useTranslation();

    const { i18n } = useTranslation();

    const getUserLanguage = () => {
        const language = navigator.language;
        console.log(language)
    
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
        console.log(savedLanguage)
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
        <div className='flex justify-between items-center h-18 py-1 px-6 border-b-2 dark:border-dark-card-bg z-[100]'>
            <h1 className='text-5xl p-2 flex text-black dark:text-white font-extrabold font-montserrat'><img className='mr-3 ' src="/logo.svg" alt="" /><a href="/">weLearn</a></h1>
            <div className='flex items-center space-x-4'>
                <a className='text-primary-marine-blue dark:text-primary-link-purp' href='/login'>{t('Login')}</a>
                <a className='text-primary-marine-blue dark:text-primary-link-purp' href='/signup'>{t('Signup')}</a>
                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-md text-xl border-1 border-black dark:border-white" onClick={toggleTheme}>
                    <FontAwesomeIcon icon = {faMoon} />
                </div>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 text-xl bg-transparent text-black dark:text-white dark:border-white"><FontAwesomeIcon icon = {faLanguage} /></div>
                    <ul tabIndex={0} className="dropdown-content z-[9999] menu p-2 shadow bg-white dark:bg-dark-card-bg rounded-box w-52">
                        <li>
                            <a className='dark:text-white' onClick={() => {
                                i18n.changeLanguage('ENG');
                                localStorage.setItem('language', 'ENG');
                            }}>
                                {t('ENG')}
                            </a>
                        </li>
                        <li>
                            <a className='dark:text-white' onClick={() => {
                                i18n.changeLanguage('FRE');
                                localStorage.setItem('language', 'FRE');
                            }}>
                                {t('FRE')}
                            </a>
                        </li>
                        <li>
                            <a className='dark:text-white' onClick={() => {
                                i18n.changeLanguage('SPA');
                                localStorage.setItem('language', 'SPA');
                            }}>
                                {t('SPA')}
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='h-profile-sm w-profile-sm border-2 rounded-full border-neutral-cool-gray dark:border-white'>
                    <a href="/login"><ProfilePicture /></a>
                </div>
            </div>
        </div>
    )
}

export default Header
