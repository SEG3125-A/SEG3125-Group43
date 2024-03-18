/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Components
import CardDivided from './cardDivided'

// Utils 
import { updateLoginCredentials, authenticateUser, getLoginCredentials } from '../../firebase/utils';

// Navbar component 
import Header from '../header/authnav';

// Footer component
import Footer from '../footer/footer';

// Translation
import { useTranslation } from 'react-i18next';

import ErrorAlert from '../ErrorAlert';
import IsLoading from '../isLoading';

export default function LoginPanel() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { t }= useTranslation();

    const {i18n} = useTranslation();
    useEffect(() => {
      i18n.changeLanguage(localStorage.getItem('language') ?? 'ENG');
    }, [])

    return (
        <>
            {/* ... */}
            {error && <ErrorAlert error={error} />}
            <div className='flex justify-center items-center absolute top-1/2 left-1/2'>
            {loading && <IsLoading />}
            </div>
            {/* ... */}
            <div className='min-w-screen min-h-screen overflow-hidden bg-white dark:bg-dark-page-bg font-ubuntu'>
            <Header type='login'/>
            <CardDivided
            divPosition={0.3}
            cardStyle="dark:bg-dark-card-bg dark:text-white dark:border-0"

            title={t('Welcome Back to WeLearn!')}
            titleStyle="text-[30px] text-center dark:text-white"

            subtitle={t('Sign in to your account')}
            subtitleStyle='text-center mt-7 dark:text-white'
    
            rightStyle='flex flex-col py-10 mx-16 -px-10'

            nextBtn={true}
            nextBtnText={t('Sign in')}
            nextBtnStyle='mt-[110px]'
            nextBtnFunction={() => {
                updateLoginCredentials(email, password);
                authenticateUser(getLoginCredentials().email, getLoginCredentials().password, setLoading).then(() => {
                }).catch((error) => setError(error.message));
            }}

            googleSignup={true}

            childrenRight={
                <>
                    <div className='mx-5 '>
                        <div className='flex flex-col gap-4 w-full'>
                            <div className='flex flex-col gap-2'>
                                <label className=''>
                                    <div className="label">
                                    <span className='label-text text-primary-marine-blue dark:text-white'>
                                        {t("emailAddress")}
                                    </span>
                                    </div>
                                    <input
                                    type='email'
                                    placeholder={t("enterYourEmailAddress")}
                                    className='input input-bordered w-full bg-transparent'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    />
                                </label>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className=''>
                                    <div className="label">
                                    <span className='label-text text-primary-marine-blue dark:text-white'>
                                    {t("password")}
                                    </span>
                                    </div>
                                    <input
                                    type='password'
                                    placeholder={t("enterYourPassword")}
                                    required
                                    className='input input-bordered w-full bg-transparent'
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </>
            }
            />
            <Footer />
            </div>
        </>
    )
}
