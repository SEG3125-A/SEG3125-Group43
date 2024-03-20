/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import SignUpPanel from '../components/sign-up/sign-up-panel';

export default function SignUp() {
    const { t } = useTranslation();  
    useEffect(() => {
        document.title = "weLearn | " + t("Signup");
      })
    return (
        <div className='bg-white overflow-hidden'>
            <SignUpPanel />
        </div>
    )
}