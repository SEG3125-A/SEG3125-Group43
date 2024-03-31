/* eslint-disable @typescript-eslint/no-unused-vars */
// CallToAction.js
import React from 'react';
import { useContext } from 'react';
import TabContext from '../../context/TabContext';
import { useTranslation } from 'react-i18next';

const CallToAction = () => {
  const setTab = useTab();
  const { t } = useTranslation();

  return (
    <div className="text-center p-8 text-black dark:text-white">
      <h2 className="text-3xl font-bold mb-4">{t('Ready to level up your skills?')}</h2>
      <button className="btn bg-primary-marine-blue text-white dark:bg-primary-link-purp btn-lg" onClick={() => {
        setTab('Courses');
      }}>{t('Browse Courses')}</button>
    </div>
  );
};

const useTab = () => {
  const {setTab} = useContext(TabContext);
  return setTab;
}

export default CallToAction;