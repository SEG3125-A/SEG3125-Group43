// WelcomeSection.js
import React from 'react';

import { useTranslation } from 'react-i18next';

const WelcomeSection = ({ userName  }: {userName : string | null | undefined})  => {
  const { t } = useTranslation();
  const greeting = userName ? `${t('Welcome back')}, ${userName}!` : 'Welcome to WeLearn!';

  return (
    <div className="dark:bg-dark-banner-bg text-black bg-white border-black dark:text-white p-8">
      <h1 className="text-3xl font-bold">{greeting}</h1>
      <p className="mt-2">{t('Discover your potential with our gamified learning experience.')}</p>
    </div>
  );
};

export default WelcomeSection;