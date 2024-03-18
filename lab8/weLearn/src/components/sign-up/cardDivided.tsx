/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useState, useContext } from 'react';
import PageContext from '../../context/PageContext';
import Tracker from './tracker'
import usePage from '../../hooks/usePage';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

type cardProps = {
    cardStyle?: string;

    title: string;
    titleStyle?: string;
    subtitle?: string;
    subtitleStyle?: string;

    childrenRight?: React.ReactNode;
    childrenRightStyle?: string;

    childrenLeft?: React.ReactNode;
    childrenLeftStyle?: string;

    divPosition?: number;
    leftStyle?: string;
    rightStyle?: string;

    nextBtn?: boolean;
    nextBtnText?: string;
    nextBtnStyle?: string;
    nextBtnFunction?: () => void;
    nextBtnDisabled?: boolean;

    prevBtn?: boolean;
    prevBtnText?: string;
    prevBtnStyle?: string;

    googleSignup?: boolean;
    googleSignupFunction?: () => void;
};

const CardDivided: React.FC<cardProps> = 
({title, titleStyle, subtitle, subtitleStyle, childrenRight: children, 
    childrenRightStyle: childrenStyle, cardStyle, divPosition = 0.5, 
    leftStyle, rightStyle, nextBtn: nextBtn, nextBtnText, nextBtnStyle, 
    nextBtnFunction,nextBtnDisabled= false, prevBtn, prevBtnText, 
    prevBtnStyle, googleSignup, googleSignupFunction}) => {

    const {page, setPage} = usePage();
    const { t } = useTranslation();
    return (
        <div className={`bg-white rounded-xl p-6 border-2 border-primary-transparent-purplish-blue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex min-w-[1100px] min-h-card-h ${cardStyle}`}>
           <div className={`flex-grow bg-sidebar-desktop bg-cover bg-bottom rounded-lg pr-14 pl-5 pt-10 ${leftStyle}`} style={{flex: divPosition}}>
             <Tracker 
             steps={[
                {'title' : t('STEP 1'), 'subtitle' : t('Account creation')}, 
                {'title' : t('STEP 2'), 'subtitle' : t('Topics of Interest')},
                {'title' : t('STEP 3'), 'subtitle' : t('Finalization')}
             ]}
            currentStep={page}
             />
           </div>
           <div className="border-neutral-alabaster dark:border-dark-card-bg h-full border-2">
             {/* Divider */}
           </div>
           <div className={`flex-grow ${rightStyle}`} style={{flex: 1 - divPosition, paddingLeft: 20}}>
                <h2 className={`text-4xl pb-4 pl-6 font-semibold text-primary-marine-blue translate-y-8 ${titleStyle}`}>{title}</h2>
                <p className={`text-neutral-charcoal mb-10 pl-6 text-lg ${subtitleStyle}`}>{subtitle}</p>
                <div className={`${childrenStyle}`}>{children}</div>
                {nextBtn && <button className={`btn bg-primary-marine-blue dark:bg-primary-link-purp text-neutral-magnolia px-6 ${nextBtnStyle}`} disabled={nextBtnDisabled} onClick={() => {
                    nextBtnFunction? nextBtnFunction() : setPage(page + 1);
                }}>{page === 2? t('Finish') : `${nextBtnText}`}</button>}
                {prevBtn && <button className={`btn bg-primary-marine-blue dark:bg-primary-link-purp text-neutral-magnolia px-8 ${prevBtnStyle} ${page === 0? `hidden` : `btn-active`}`} onClick={() => {
                    setPage(page - 1);
                }}>{prevBtnText}</button>}
                {googleSignup &&
                <button className={`btn bg-neutral-alabaster text-black mt-4 hover:bg-neutral-light-gray`} onClick={() => {
                    googleSignupFunction && googleSignupFunction();
                }}>
                    <FontAwesomeIcon icon={faGoogle} className='mr-5' />
                    {t('Sign in with Google')}
                </button>
                }
           </div>
        </div>
    );
};

export default CardDivided;