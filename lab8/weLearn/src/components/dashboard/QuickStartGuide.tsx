// QuickStartGuide.js
import React from 'react';

import { useTranslation } from 'react-i18next';

const QuickStartGuide = () => {
  const { t } = useTranslation()
  return ( 
    <div className="alert alert-info shadow-lg m-8 max-w-[530px] items-center justify-center flex">
      <div className=''>
        <span>{t('Get started with these easy steps:')}</span>
        <ul className="list-disc pl-8">
          <li>{t('Pick a course that interests you.')}</li>
          <li>{t('Go to your analytics to view your courses and begin a new lesson.')}</li>
          <li>{t('Take on challenges to test your knowledge.')}</li>
          <li>{t('Track your progress and level up.')}</li>
        </ul>
      </div>
    </div>
  );
}

export default QuickStartGuide;