/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

// Utils 
import { getCurrentUser, getFeaturedCourses, suggestCourses } from '../../firebase/utils'

// Translation
import { useTranslation } from 'react-i18next';

// Components 
import WelcomeSection from './WelcomeSection';
import FeaturedCourses from './FeaturedCourses';
import RecommendedCourses from './RecommendedCourses';
import QuickStartGuide from './QuickStartGuide';

import CallToAction from './CallToAction';
interface Course {
    title: string;
    id: number;
    subscribed: number;
    exp: string;
}

interface Course1 {
    title: string;
    id: number;
    subscribed: number;
    exp: string;
    topic: number;
}

export const Home = ({setTab} : {setTab : Function}) => {
    const { t } = useTranslation();

    const user = getCurrentUser();

    const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
    const [recommendedCourses, setRecommendedCourses] = useState<Course1[]>([]);

  useEffect(() => {
    getFeaturedCourses().then(courses => setFeaturedCourses(courses));
    suggestCourses(user!.uid).then(courses => setRecommendedCourses(courses!));
  }, []);

    return (
        <>
            <div className='h-full flex bg-white dark:bg-dark-page-bg'> 
            <div className='flex-grow z-[2]' style={{flex: 0.8}}>
                <div>
                    <FeaturedCourses courses={featuredCourses} setTab={setTab}/>
                </div>
                <div>
                    <RecommendedCourses courses={recommendedCourses} setTab={setTab}/>
                </div>
            </div>
            <div className='border-neutral-dark-gray dark:border-dark-card-bg h-screen mt-2 border-2'>
                {/* Divider */}
            </div>
            <div className='flex-grow items-center justify-center' style={{flex : 0.4}}>
                <div className='flex justify-center items-center'>
                <WelcomeSection userName={user?.displayName}/>
                </div>
                <div className='flex justify-center items-center'>
                <QuickStartGuide />
                </div>
                <CallToAction />
                </div>
            </div>
        </>
    )
}