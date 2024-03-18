/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'

// Page context to keep track of which page is being displayed in the sign up process
import  PageContext  from '../../context/PageContext';

// Pages
import Page1 from './page1';
import Page2 from './page2';
// import Page3 from './page3';
import Page4 from './page4';

// Navbar component 
import Header from '../header/authnav';

// Footer component
import Footer from '../footer/footer';

import { useTranslation } from 'react-i18next';

function SignUp() {
    const [page, setPage] = useState(0);
    const {i18n} = useTranslation();
    useEffect(() => {
      i18n.changeLanguage(localStorage.getItem('language') ?? 'ENG');
    }, [])
    return (
        <PageContext.Provider value={{page, setPage}}>
            <div className='min-w-screen min-h-screen overflow-hidden bg-white dark:bg-dark-page-bg font-ubuntu'>
            <Header type='signup'/>
            {page === 0 && <Page1/>}
            {page === 1 && <Page2/>}
            {page === 2 && <Page4/>}
            {/* {page === 3 && <Page4/>} */}
            <Footer />
            </div>
        </PageContext.Provider>
    )
}

export default SignUp