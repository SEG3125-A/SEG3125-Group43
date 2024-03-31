/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import LoginPanel from './../components/login/loginpanel';

export default function Login() {
    const { t } = useTranslation();  
    useEffect(() => {
        document.title = "weLearn | " + t("Login");
      })
    return (
        <>
            <LoginPanel />
        </>
    )
}