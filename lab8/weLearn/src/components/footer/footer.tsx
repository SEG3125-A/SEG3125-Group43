/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faQuestionCircle, faVolumeMute, faLanguage } from '@fortawesome/free-solid-svg-icons'

export default function Footer () {
    const location = useLocation();
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    return (
        <div className='absolute bottom-0 text-montserrat text-black justify-between flex w-screen px-12 mb-3'>
            <div>
                <p className='font-montserrat font-extrabold mt-5 cursor-pointer' onClick={() => (document.getElementById('tos') as HTMLDialogElement)?.showModal()}>{t('Terms of Service')}</p>
                <dialog id="tos" className="modal">
                <div className="modal-box bg-white">
                <h3 className="font-bold text-lg text-center">{t("Terms of Service")}</h3>
                    <div>
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
                <FontAwesomeIcon icon = {faMoon} />
                <div className="dropdown dropdown-top dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-xl">
                        <FontAwesomeIcon icon = {faQuestionCircle} />
                    </div>
                    <div tabIndex={0} className="card compact dropdown-content bg-white z-[1] shadow rounded-box w-64">
                        <div tabIndex={0} className="card-body">
                            {location.pathname === '/' && 'Home page help - placeholder'}
                            {location.pathname === '/login' && 'Login page help - placeholder'}
                            {location.pathname === '/signup' && 'Sign up page help - placeholder'}
                            {location.pathname === '/dashboard' && 'Dashboard page help - placeholder'}
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon icon = {faVolumeMute} />
                <div className="dropdown dropdown-top dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1 text-xl bg-transparent text-black"><FontAwesomeIcon icon = {faLanguage} /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
                    <li><a onClick={() => i18n.changeLanguage('ENG')}>{t('ENG')}</a></li>
                    <li><a onClick={() => i18n.changeLanguage('FRE')}>{t('FRE')}</a></li>
                    <li><a onClick={() => i18n.changeLanguage('SPA')}>{t('SPA')}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}