/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import ProfilePicture from './profilePicture'
import { useTranslation } from 'react-i18next';

// Utility functions 
import { signUserOut, getDatabaseRef, updateCourses } from '../../firebase/utils';

import { hideSidebar } from '../../pages/dashboard';

// Icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHome, faBook, faCog, faSignOutAlt, faSearch, faMoon } from '@fortawesome/free-solid-svg-icons';
import { BsGraphUp, BsMoon } from "react-icons/bs";
import { CiClock2, CiSquarePlus } from "react-icons/ci";
import { MdOutlineHome } from "react-icons/md";
import { LuBookMarked } from "react-icons/lu";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { RiArrowLeftDoubleFill } from "react-icons/ri";

// Alert
import Alert from '@mui/material/Alert';
import { Button, Stack } from '@mui/material';

const Sidebar = ({ setTab, currentTab }: { setTab: Function, currentTab: string }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [signOut, setSignOut] = useState(false);

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const handleSignOut = () => {
        if (signOut) {
            signUserOut(setLoading);
        } else {
            setSignOut(true);
        }
    }

    const undoSignOut = () => {
        setSignOut(false);
    }

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setTheme('light')
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark')
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const themeToUse = savedTheme ? savedTheme : 'light';
        if (themeToUse !== (document.documentElement.classList.contains('dark') ? 'dark' : 'light')) {
            toggleTheme();
        }
    }, [])

    return (
        <>
        {signOut && (
                <div className='fixed left-1/2 top-[100px] -translate-x-64'>
                    <Stack sx={{ width: '200%'}}>
                        <Alert
                            severity="info"
                            variant='filled'
                            
                            action={
                                <>
                                <Button color='inherit' size='small' onClick={() => {setSignOut(true); handleSignOut(); }}>
                                    {t('YES')}
                                </Button>
                                <Button color="inherit" size="small" onClick={undoSignOut}>
                                    {t('UNDO')}
                                </Button>  
                                </>
                            }
                        >
                            {t('Confirm signout ?')}
                        </Alert>
                    </Stack>
                </div>
            )}
        <div className='fixed left-0 flex flex-col border-r dark:border-dark-banner-bg w-20 h-screen bg-dark-card-bg text-white'>
            <div className='flex flex-col gap-6 p-6 py-10 border-b dark:border-black'>
                <img className='' src={theme === 'light' ? '/logo-blue.svg' : '/logo-purp.svg'} alt="weLearn" /><a href="/"></a>
                <div onClick={hideSidebar}>
                    <button>
                        <RiArrowLeftDoubleFill size={'32px'} className='-translate-x-[1px]'/>
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-1 justify-center items-center py-10 ml-1 -mr-1 border-b dark:border-black '>
                <div className={`-translate-x-[6px] w-full py-5 items-center justify-center text-center cursor-pointer ${currentTab === 'Home' ? 'dark:bg-primary-link-purp bg-primary-marine-blue' : ''}`}
                onClick={() => setTab('Home')}>
                    <button>
                        <MdOutlineHome size={'34px'}/>
                    </button>
                </div>
                <div className={`-translate-x-[5px] w-full py-5 items-center justify-center text-center cursor-pointer ${currentTab === 'Courses' ? 'dark:bg-primary-link-purp bg-primary-marine-blue' : ''}`}
                    onClick={() => setTab('Courses')}>
                    <button>
                        <LuBookMarked size={'28px'}/>
                    </button>
                </div>
                <div className={`-translate-x-[2px] w-full py-5 mr-1 items-center justify-center text-center cursor-pointer ${currentTab === 'Analytics' ? 'dark:bg-primary-link-purp bg-primary-marine-blue' : ''}`}
                onClick={() => setTab('Analytics')}>
                    <button>   
                        <BsGraphUp size={'22px'}/>
                    </button>
                </div>
                <div className={`-translate-x-[5px] w-full py-5 items-center justify-center text-center cursor-pointer ${currentTab === 'Timestable' ? 'dark:bg-primary-link-purp bg-primary-marine-blue' : ''}`}
                    onClick={() => setTab('Timestable')}>
                    <button>
                        <CiClock2 size={'28px'} />
                    </button>
                </div>
                <div className='-translate-x-[6px] mt-8 cursor-pointer' onClick={() => updateCourses(getDatabaseRef())}>
                    <CiSquarePlus size={'30px'}/>
                </div>
            </div>
            <div className='flex flex-col gap-10 p-6 py-10 ml-1 border-b dark:border-black'>
                <button className='-translate-x-[0px]' onClick={toggleTheme}>
                    <BsMoon size={'25px'}/>
                </button>
                <div className='-translate-x-[2px]'>
                    <FaCog size={'25px'}/>
                </div>
                <div className='-translate-x-[1px]'>
                    <button onClick={handleSignOut}><FaSignOutAlt size={'25px'}/></button>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default Sidebar