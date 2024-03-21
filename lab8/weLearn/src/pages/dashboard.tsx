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
                    <div className='fixed top-0 z-[9999]'>
                        <Header />
                    </div>
                    <div className='sidebar'>
                    <Sidebar setTab={setTab} currentTab={tab} />
                    </div>
                    <div className='pt-20 pl-20 content'>
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

export const revealSidebar = () => {
    const sidebar = document.querySelector('.sidebar') as HTMLDivElement;
    const header = document.querySelector('.header') as HTMLDivElement;
    const content = document.querySelector('.content') as HTMLDivElement;
  
    sidebar.classList.toggle('hide');

    header.classList.add('ml-20');
    header.classList.add('pr-32');

    content.classList.add('pl-20');
    content.classList.add('left-0');
  };
  
  export const hideSidebar = () => {
    const sidebar = document.querySelector('.sidebar') as HTMLDivElement;
    const header = document.querySelector('.header') as HTMLDivElement;
    const content = document.querySelector('.content') as HTMLDivElement;

    sidebar.classList.toggle('hide');

    header.classList.remove('ml-20');
    header.classList.remove('pr-32');
    
    content.classList.remove('pl-20');
    content.classList.remove('left-0');

  };