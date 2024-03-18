/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import usePage from '../../hooks/usePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

type Step = {
    title: string; 
    subtitle: string;
}
type trackerProps = {
    steps?: Step[];
    currentStep?: number;
};

const Tracker: React.FC<trackerProps> = ({steps, currentStep}) => {
    const page = usePage().page;

    steps === null ? steps = [{'title' : 'Step 1', 'subtitle' : 'YOUR INFO'}, {'title' : 'Step 2', 'subtitle' : 'SELECT PLAN'}] : steps;
    return (
        <div>
            {steps?.map((step, index) => (
                <div className='flex flex-row gap-4 mb-14 ml-3' key={index}>
                    <div className={`rounded-full w-12 h-12 flex items-center justify-center border-neutral-light-gray border-2 transition duration-300
                    ${index === page ? 'bg-primary-faded-text text-black' : 'bg-transparent text-white'}
                    `}>
                        <p>{index < currentStep! ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        index + 1
                      )}</p> 
                    </div>
                    <div className="font-montserrat ml-2">
                        <h2 className='font-extrabold text-xl'>{step.title}</h2>
                        <h1 className='text-white font-bold tracking-wider text-xl whitespace-nowrap'>{step.subtitle}</h1>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tracker;