/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faQuestionCircle, faVolumeMute, faLanguage } from '@fortawesome/free-solid-svg-icons'

export default function Footer () {
    return (
        <div className='absolute bottom-0 text-montserrat text-black justify-between flex w-screen px-12 mb-5'>
            <div><p className='font-montserrat font-extrabold'>Terms of Service</p></div>
            <div className='text-2xl justify-between space-x-8'>
                <FontAwesomeIcon icon = {faMoon} />
                <FontAwesomeIcon icon = {faQuestionCircle} />
                <FontAwesomeIcon icon = {faVolumeMute} />
                <FontAwesomeIcon icon = {faLanguage} />
            </div>
        </div>
    )
}