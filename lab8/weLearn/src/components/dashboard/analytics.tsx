/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

// Translation
import { useTranslation } from 'react-i18next';

// Utils 
import { getUserSignedCourses, getCurrentUser } from '../../firebase/utils';

interface SubscribedCourse {
    title: string;
    id: number;
    exp: string;
    lessons : []; 
  }

  const CourseCard = ({ course } : {course : SubscribedCourse}) => {
    const { t } = useTranslation()

    const totalLessons = course?.lessons?.filter(lesson => lesson.type === 'lesson').length || 0;
    let lessonCount = 0;

    return (
        <div className=" px-7 py-8 mt-4 border-2 border-gray-300 dark:bg-dark-card-bg dark:border-0">
          <div className='text-black dark:text-white '>
            <h1 className='text-sm text-gray-500'>{t('Course')}</h1>
            <h1 className='text-2xl'>{course?.title}</h1>
            <div className='grid grid-flow-row font-normal gap-5 border px-20 py-10 mt-5'>
              {course && course.lessons && course.lessons.map((lesson : {title : string, description : string, type : string}, index) => {
                let lessonNumber;
                if (lesson.type === 'lesson') {
                  lessonCount++;
                  lessonNumber = <p>{lessonCount}/{totalLessons}</p>;
                }
                return (
                  <div key={index} className='grid grid-cols-2'>
                    <div>
                      <h2 className='flex flex-row gap-3'>{t(lesson.type)}{lessonNumber}</h2>
                      
                    </div>
                    <div>
                      <h2>{t(lesson.title)}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='flex gap-8 mt-5 items-start justify-end'>
            <button className='btn'>{t('View Syllabus')}</button>
            <button className='btn'>{t('Resume Learning')}</button>
          </div>
        </div>
      )
}

export const Analytics = () => {
    const { t } = useTranslation();

    const [userCourses, setUserCourses] = useState<SubscribedCourse[]>([])
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        // Fetch user courses
        getUserSignedCourses(getCurrentUser()!.uid).then(courses => {
            if (courses) {
                setUserCourses(courses);
            }
        });
    }, [])

    let i = 0;
    return (
        <>
            <div className='h-full flex bg-white dark:bg-dark-page-bg'> 
                <div className='flex-grow z-[2] mb-10' style={{flex: 0.8}}>
                    <div className='px-20 gap-10 flex flex-col font-bold mt-5'>
                        <div className='flex flex-row justify-between'><h1 className='text-3xl text-black dark:text-white'>{t('Course Analytics')}</h1> <input type="text" placeholder={t("Search all courses...")} className="input input-bordered min-w-[500px] min-w-xl bg-transparent" onChange={handleSearchChange}/></div>
                        <div>
                            <div className='flex flex-row gap-5'><h1 className='text-3xl text-black dark:text-white'>{t('My Courses')}</h1><h1 className='text-xl mt-2 cursor-pointer text-primary-marine-blue dark:text-primary-link-purp'>{t('Edit')}</h1></div>
                            {userCourses
                            .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(course => <CourseCard key={i++} course={course} />)}
                        </div>
                    </div>
                </div>
                <div className='border-neutral-dark-gray dark:border-primary-link-purp h-screen border'>
                    {/* Divider */}
                </div>
                <div className='flex-grow items-center justify-center' style={{flex : 0.4}}>
                    <div></div>
                    <div>
                        <div className='flex flex-row border-b-gray-400 dark:border-b-white border-b gap-5 pt-24 pb-4 px-10'><h1 className=' font-bold text-2xl text-black dark:text-white'>{t('My Goals')}</h1><h1 className='text-xl font-bold mt-1 cursor-pointer text-primary-marine-blue dark:text-primary-link-purp'>{t('Edit')}</h1></div>
                        <div><h1 className='text-black dark:text-white pt-20 px-10'>{t('No Goals currently set.')}</h1></div>
                    </div>
                </div>
            </div>
        </>
    )
}