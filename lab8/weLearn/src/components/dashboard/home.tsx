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

export const Home = () => {
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
                    <FeaturedCourses courses={featuredCourses}/>
                </div>
                <div>
                    <RecommendedCourses courses={recommendedCourses}/>
                </div>
            </div>
            <div className='border-neutral-dark-gray dark:border-dark-card-bg h-screen mt-2 border-2'>
                {/* Divider */}
            </div>
            <div className='flex-grow items-center justify-center' style={{flex : 0.4}}>
                <WelcomeSection userName={user?.displayName}/>
                <QuickStartGuide />
                <CallToAction />
                </div>
            </div>
        </>
    )
}