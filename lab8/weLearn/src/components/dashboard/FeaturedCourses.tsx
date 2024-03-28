// FeaturedCourses.js
import React from 'react';

import { useTranslation } from 'react-i18next';

interface Course {
  title: string;
  id: number;
  subscribed: number;
  exp: string;
}
const CourseCard = ({ course, setTab } : {course : Course, setTab : Function}) => {
  const { t } = useTranslation();
  return (
    <div className="card card-compact bg-base-100 shadow-xl z-[2]">
      <div className="card-body z-[2]">
        <h2 className="card-title">{course.title}</h2>
        <div className="card-actions justify-end">
          <button className="btn bg-primary-marine-blue text-white dark:bg-primary-link-purp" onClick={() => setTab('Courses')}>{t('Browse Courses')}</button>
        </div>
      </div>
    </div>
  );
}

let i = 0;

const FeaturedCourses = ({ courses, setTab } : {courses : Course[], setTab : Function}) => {
  const { t } = useTranslation(); 
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">{t('Featured Courses')}</h2>
      <p className='text-xl mb-3 text-black dark:text-white'>{t('Here are a selection of courses which are trending right now.')}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        {courses.map(course => <CourseCard key={i++} course={course} setTab={setTab}/>)}
      </div>
    </div>
  );
}

export default FeaturedCourses;