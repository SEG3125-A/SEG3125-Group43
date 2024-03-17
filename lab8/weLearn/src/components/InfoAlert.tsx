/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

type InfoAlertProps = {
    text: string;
    confirm: () => void;
    deny: () => void;
};

const InfoAlert = ({ text, confirm, deny }: InfoAlertProps) => {
    const [showAlert, setShowAlert] = useState(true);
    const { t } = useTranslation();
  return (
    <div role="alert" className="alert z-[3000] bg-white">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span className='text-black'>{text}</span>
    <div className=''>
        <button className="btn btn-sm mr-2" onClick={deny}>{t('Nevermind')}</button>
        <button className="btn btn-sm btn-primary" onClick={confirm}>{t('Yes')}</button>
    </div>
    </div>
  )
}

export default InfoAlert