/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react'; 
import { getTopicName } from '../../firebase/utils';

interface Course1 {
  title: string;
  id: number;
  subscribed: number;
  exp: string;
  topic: number;
}

const CourseCard = ({ course } : {course : Course1}) => (
  <div className="card card-compact bg-base-100 shadow-xl z-[100]">
    <div className="card-body">
      <h2 className="card-title text-white">{course.title}</h2>
      <div className="card-actions justify-end">
        <button className="btn bg-primary-marine-blue text-white dark:bg-primary-link-purp">Start Learning</button>
      </div>
    </div>
  </div>
);

const groupByTopic = (courses: Course1[]) => {
  return courses.reduce((groupedCourses, course) => {
    const topicId = Number(course.topic);
    (groupedCourses[topicId] = groupedCourses[topicId] || []).push(course);
    return groupedCourses;
  }, {} as Record<number, Course1[]>);
};

const fetchTopicName = async (id: number) => {
  const topicName = await getTopicName(id);
  return topicName;
};


const RecommendedCourses = ({ courses } : {courses : Course1[]}) => {
  const groupedCourses = groupByTopic(courses);
  const [topicNames, setTopicNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTopicNames = async () => {
      const groupedCourses = groupByTopic(courses);
      const newTopicNames: Record<string, string> = {};
      for (const topicId of Object.keys(groupedCourses)) {
        newTopicNames[topicId] = await getTopicName(Number(topicId));
      }
      setTopicNames(newTopicNames);
    };

    fetchTopicNames();
  }, [courses]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Recommended Courses</h2>
      <p className='text-xl mb-3 text-black dark:text-white'>Here are a selection of courses recommended based on your interests.</p>
      {Object.entries(groupedCourses).map(([topic, courses]) => (
        <div key={topic} className='my-10'>
        <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Because you love {topicNames[topic]}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedCourses;