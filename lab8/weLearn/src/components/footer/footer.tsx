/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faQuestionCircle, faVolumeMute, faLanguage } from '@fortawesome/free-solid-svg-icons'

export default function Footer () {
    const location = useLocation();
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
        <div className='absolute bottom-0 text-montserrat justify-between flex w-screen px-12 mb-3 text-black dark:text-white'>
            <div>
                <p className='font-montserrat font-extrabold mt-5 cursor-pointer' onClick={() => (document.getElementById('tos') as HTMLDialogElement)?.showModal()}>{t('Terms of Service')}</p>
                <dialog id="tos" className="modal">
                <div className="modal-box bg-white dark:bg-dark-card-bg">
                <h3 className="font-bold text-lg text-center">{t("Terms of Service")}</h3>
                    <div className='dark:text-white'>
                        <p>1. {t('Be nice')}</p>
                        <p>2. {t('Be respectful')}</p>
                        <p>3. {t('Be responsible')}</p>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                </dialog>
            </div>
            <div className='text-2xl justify-between space-x-8'>
                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-md text-xl" onClick={toggleTheme}>
                    <FontAwesomeIcon icon = {faMoon} />
                </div>
                <div className="dropdown dropdown-top dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-md text-xl">
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </div>
                    <div tabIndex={0} className="card compact dropdown-content bg-white z-[1] shadow rounded-box w-64">
                        <div tabIndex={0} className="card-body text-black dark:text-white dark:bg-dark-card-bg dark:border-2 rounded-md dark:border-neutral-magnolia">
                            {location.pathname === '/' && 'Home page help - placeholder'}
                            {location.pathname === '/login' && 'Login page help - placeholder'}
                            {location.pathname === '/signup' && 'Sign up page help - placeholder'}
                            {location.pathname === '/dashboard' && 'Dashboard page help - placeholder'}
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon icon = {faVolumeMute} />
                <div className="dropdown dropdown-top dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1 text-xl bg-transparent text-black dark:text-white dark:border-white"><FontAwesomeIcon icon = {faLanguage} /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white dark:bg-dark-card-bg rounded-box w-52">
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
            </div>
        </div>
    )
}