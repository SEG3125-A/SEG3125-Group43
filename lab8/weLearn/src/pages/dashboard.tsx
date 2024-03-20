/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

// Context
import TabContext from '../context/TabContext';

// Header
import Header from '../components/header/boardnav';

// Sidebar
import Sidebar from '../components/header/boardsidebar';

// Pages 
import { Home } from '../components/dashboard/home';
import { Analytics } from '../components/dashboard/analytics';
import { Courses }  from '../components/dashboard/courses';
import {TimesTable } from '../components/dashboard/timestable';

export default function Dashboard() {
    const [tab, setTab] = useState('Home');

    useEffect(() => {
        document.title = "weLearn | Dashboard"
    })
    return (
        <TabContext.Provider value={{ tab, setTab }}>
            <div className='h-screen w-screen bg-white dark:bg-dark-page-bg'>
                <div className='h-screen w-screen bg-white dark:bg-dark-page-bg'>
                    <div className=''>
                        <Header />
                    </div>
                    <div>
                    <Sidebar setTab={setTab} currentTab={tab} />
                    </div>
                    <div className='pt-20 pl-20'>
                        {tab === 'Home' && <Home />}
                        {tab === 'Analytics' && <Analytics />}
                        {tab === 'Courses' && <Courses />}
                        {tab === 'Timestable' && <TimesTable />}
                    </div>
                </div>
            </div>
        </TabContext.Provider>

    )   
}