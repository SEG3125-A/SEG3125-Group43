/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

const useTopics = () => {
    let [userTopics, setUserTopics] = useState<number[]>([]);

    let [selectedTopics, setSelectedTopics] = useState<number[]>([]);

    useEffect(() => {
        setUserTopics(selectedTopics);
      }, [selectedTopics]);
    
    return {userTopics, setUserTopics, selectedTopics, setSelectedTopics};
}

export default useTopics;