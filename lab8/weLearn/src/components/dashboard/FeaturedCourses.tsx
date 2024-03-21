// FeaturedCourses.js
import React from 'react';

interface Course {
  title: string;
  id: number;
  subscribed: number;
  exp: string;
}
const CourseCard = ({ course } : {course : Course}) => (
  <div className="card card-compact bg-base-100 shadow-xl z-[2]">
    <div className="card-body z-[2]">
      <h2 className="card-title">{course.title}</h2>
      <div className="card-actions justify-end">
        <button className="btn bg-primary-marine-blue text-white dark:bg-primary-link-purp">Start Learning</button>
      </div>
    </div>
  </div>
);

const FeaturedCourses = ({ courses } : {courses : Course[]}) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Featured Courses</h2>
    <p className='text-xl mb-3 text-black dark:text-white'>Here are a selection of courses which are trending right now.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
      {courses.map(course => <CourseCard key={course.id} course={course} />)}
    </div>
  </div>
);

export default FeaturedCourses;