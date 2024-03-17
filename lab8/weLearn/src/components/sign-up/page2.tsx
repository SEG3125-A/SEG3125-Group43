/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

// Database reference 
import { getTopics } from "../../firebase/utils";

// Storing user topic information
import useTopics from "../../hooks/useTopics";

// Moving page
import usePage  from "../../hooks/usePage";

// Utils 
import { updateUserTopics, getUserTopics, getUserCredentials } from "../../firebase/utils"

// Translation
import { useTranslation } from 'react-i18next';

// Components
import CardDivided from "./cardDivided";
import ErrorAlert from "../ErrorAlert";
import Card from "./card";
import IsLoading from "../isLoading";
import { DocumentData } from "firebase/firestore";

function Page2 () {
  const { t } = useTranslation();
  // THIS IS MESSY AND NEEDS TO BE CLEANED UP
  // APOLOGIES 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [topics, setTopics] = useState<DocumentData[]>([]); 
    const [filter, setFilter] = useState('');

    const { userTopics, selectedTopics, setSelectedTopics } = useTopics();

    const { page, setPage } = usePage();

    // Ran into an issue where the data wasn't stored properly
    // After a page switch 
    // Temporary fix: store the final data in a variable set in Utils
    // and then retrieve it when needed
    const handleSelect = (topicId: number | string) => {
      const topicIdNumber = typeof topicId === 'string' ? parseInt(topicId) : topicId;
    
      if (selectedTopics.includes(topicIdNumber)) {
        const newSelectedTopics = selectedTopics.filter((topic) => topic !== topicIdNumber);
        setSelectedTopics(newSelectedTopics);
        updateUserTopics(newSelectedTopics);
      } else {
        const newSelectedTopics = [...selectedTopics, topicIdNumber];
        setSelectedTopics(newSelectedTopics);
        updateUserTopics(newSelectedTopics);
      }
    };

    // Adds a condition where if the user has already selected topics 
    // They will appear checked in the grid 
    useEffect(() => {
      // If getUserTopics() is not empty, set selectedTopics to 
      // the user's topics
      if (getUserTopics() && getUserTopics().length > 0) {
        setSelectedTopics(getUserTopics());
      }
    }, []); 

    // Fetches the topics from the database
    useEffect(() => {
        getTopics(setIsLoading)
            .then((topics: DocumentData[] | undefined) => setTopics(topics || []))
            .catch(error => setError(error));
    }, [userTopics]);

    return (
      <div className='flex justify-center items-center h-full overflow-hidden'>
        {error && <ErrorAlert error = {error} />}
        <div className="absolute top-[490px] ml-[315px] z-[2000]">
          {isLoading && <IsLoading />}
        </div>
        <CardDivided 
        divPosition={0.35}
        cardStyle="dark:bg-dark-card-bg dark:text-white dark:border-0"
        title={t("What topic would you like to learn about ?")}
        titleStyle="text-[22px] text-center dark:text-white"

        rightStyle='flex flex-col py-10 mx-16 -px-10'

        nextBtn={true}
        nextBtnText={t('Continue')}
        nextBtnStyle="absolute bottom-10 ml-[110px]"
        nextBtnFunction={() => {
          updateUserTopics(userTopics)
          setPage(page + 1)
        }}

        prevBtn={true}
        prevBtnText={t('Go Back')}
        prevBtnStyle="absolute bottom-10 right-0 mr-[210px]"

        childrenRight={
            <>
              <div className='mx-5'>
                <div className="items-center text-center">
                    <input type="text" placeholder={t("Search...")} className="input input-bordered w-full max-w-md bg-transparent mr-2 dark:bg-white" onChange={(e) => {
                        setFilter(e.target.value)
                    }}/>
                </div>
                <div className="h-[480px] overflow-auto flex flex-wrap overflow-x-hidden gap-1 mt-3 mb-5 -mx-12 px-4">
                {topics
                  .filter(topic => topic.title.toLowerCase().includes(filter.toLowerCase()))
                  .map((topic) => (
                    <Card
                      key={topic.id}
                      title={t(topic.title)}
                      detail={t(topic.detail)}
                      image={true}
                      imagelink={topic.image}
                      id={topic.id}
                      onSelect={handleSelect}
                      className={selectedTopics.includes(topic.id) || getUserTopics()?.includes(topic.id) ?  'selected' : ''}
                    />
                ))}
                {/*Can't select element 0 - Animation*/}
                </div>
              </div>
            </>
          }
        />
      </div>
    )
}
export default Page2;