// Loading page component 
import React from 'react';

export default function IsLoading() {
    return (
        <div className='flex justify-center items-center z-[1000] fixed translate-y-1/2 overflow-hidden'>
            <div className='flex flex-col items-center'>
                <div className='animate-spin w-16 h-16 border-t-2 border-b-2 border-gray-900 dark:border-white rounded-full'></div>
                <div className='mt-4 text-gray-900 dark:text-white'>Loading...</div>
            </div>
        </div>
    )
}