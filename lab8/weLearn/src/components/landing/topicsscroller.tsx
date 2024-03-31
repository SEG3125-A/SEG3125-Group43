/* eslint-disable @typescript-eslint/no-unused-vars */
import React , { useEffect, useState } from 'react';
import { getTopics } from './../../firebase/utils';
import { DocumentData } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

export const TopicsScroller = () => {
const [topics, setTopics] = useState<DocumentData[]>([]);
const [loading, setLoading] = useState(false);

const { t } = useTranslation(); 

useEffect(() => {
    async function fetchTopics() {
        const fetchedTopics = await getTopics(setLoading);
        if (fetchedTopics) {
            setTopics(fetchedTopics);
        }
    }

    fetchTopics();
}, []);

return (
    <div className="flex space-x-4 overflow-hidden">
      <div className="flex space-x-6 text-xl animate-scroll">
        {topics.map((topic, index) => (
          <div key={index} className="whitespace-nowrap">
            <p className='text-black dark:text-primary-link-purp'>{t(topic.title)}</p>
          </div>
        ))}
        {topics.map((topic, index) => (
          <div key={index} className="whitespace-nowrap">
            <p className='text-black dark:text-primary-link-purp'>{t(topic.title)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}