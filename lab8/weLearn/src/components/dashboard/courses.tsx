/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'

// Components
import IsLoading from '../isLoading';

// Utils
import { getCourses, getDatabaseRef, signUpToCourse, isAlreadySignedUp } from '../../firebase/utils';

// Translation 
import { useTranslation } from 'react-i18next';

// Alert
import Alert from '@mui/material/Alert';
import { Button, Stack } from '@mui/material';

interface Course1 {
    title: string;
    id: number;
    subscribed: number;
    exp: string;
    topic: number;
}
  
const CourseCard = ({ course, signedUp, setSignedUp, setShowAlert, setContext } : {course : Course1, signedUp: boolean, setSignedUp: React.Dispatch<React.SetStateAction<boolean>>, setShowAlert: React.Dispatch<React.SetStateAction<boolean>>, setContext: React.Dispatch<React.SetStateAction<string>>}) => {
    const { t } = useTranslation();
    const handleSignUp = async (topic : number, course : number) => {
        if(await isAlreadySignedUp(topic, course)){
            setSignedUp(true);
            setShowAlert(true);
            setContext(t('Failed to signup, you are already signed up for this course.'));
        } else {
            setSignedUp(false);
            setShowAlert(true);
            signUpToCourse(topic, course);
            setContext(t('Successfully signed up for the course.'));
        }
    }
    return (
        <div className="card card-compact bg-base-100 shadow-xl z-[2]">
        <div className="card-body z-[2]">
            <h2 className="card-title">{t(course.title)}</h2>
            <h2 className="card-title">{t('Difficulty : ')}{t(course.exp)}</h2>
            <div className="card-actions justify-end">
            <button className="btn bg-primary-marine-blue text-white dark:bg-primary-link-purp" onClick={() => {
                handleSignUp(course.topic, course.id);
            }}>{t('Start Learning')}</button>
            </div>
        </div>
        </div>
    )
};

export const Courses = () => {
    const { t } = useTranslation();

    const [search, setSearch] = useState('');

    const [courses, setCourses] = useState<Course1[]>([]);

    const [filteredCourses, setFilteredCourses] = useState<Course1[]>([]);

    const [signedUp, setSignedUp] = useState(true);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value; 
        setSearch(searchTerm);
    
        if(searchTerm === '') {
            setFilteredCourses([...courses]);
        } else {
            setFilteredCourses(courses.filter(course => course.title.toLowerCase().includes(search.toLowerCase())));
        }
    }

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getCourses(getDatabaseRef(), setLoading).then((data : Course1[]) => {
            setCourses(data);
            setFilteredCourses(data);
        });
    }, [])

    const [showAlert, setShowAlert] = useState(false);
    const [context, setContext] = useState('');

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 4000);
            return () => clearTimeout(timer); 
        }
    }, [showAlert]);

    let i = 0; // To get unique keys for each course card

    return (
        <>
        {loading && <><div className='top-1/2 left-1/2 absolute'><IsLoading /></div></>}
        {showAlert && 
            <div className='fixed inset-0 flex ml-20 mt-20 justify-center z-[9999]'>
                <Stack sx={{ width: '100%'}}>
                    <Alert
                        severity="info"
                        variant='filled'
                        action={
                            <>
                            </>
                        }
                    >
                        {t(context)}
                    </Alert>
                </Stack>
            </div>
        }

            <div className='justify-center items-center flex flex-col gap-9 bg-white dark:bg-dark-page-bg font-bold'>
            <h1 className='text-4xl mt-5 text-black dark:text-white'>{t('Search all courses')}</h1>
            <div className=''>
            <input type="text" placeholder={t("Search all courses...")} className="input input-bordered min-w-[500px] min-w-xl bg-transparent border-gray-500 text-black dark:text-white" onChange={handleSearch}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 text-white">
            {filteredCourses
            .map(course => 
            <CourseCard key={i++} course={course} signedUp={signedUp} setSignedUp={setSignedUp} setShowAlert={setShowAlert} setContext={setContext}
            />)}
            </div>
        </div> 
        </>
    )
}