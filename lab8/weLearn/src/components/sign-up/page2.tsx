/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

// Database reference 
import { getTopics } from "../../firebase/utils";

// Components
import CardDivided from "./cardDivided";
import ErrorAlert from "../ErrorAlert";
import Card from "./card";
import { DocumentData } from "firebase/firestore";

function Page2 () {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    const [topics, setTopics] = useState<DocumentData[]>([]); 
    const [filter, setFilter] = useState('');
    useEffect(() => {
        getTopics()
            .then((topics: DocumentData[] | undefined) => setTopics(topics || []))
            .catch(error => setError(error));
    }, []);
    return (
      <div className='flex justify-center items-center h-full'>
        {error && <ErrorAlert error = {error} />}
        <CardDivided 
        divPosition={0.35}
        title="What topic would you like to learn about ?"
        titleStyle="text-[22px] text-center"

        rightStyle='flex flex-col py-10 mx-16 -px-10'

        nextBtn={true}
        nextBtnText='Continue'
        nextBtnStyle="absolute bottom-10 ml-[130px]"

        prevBtn={true}
        prevBtnText='Go Back'
        prevBtnStyle="absolute bottom-10 right-0 mr-[230px]"

        childrenRight={
            <>
              <div className='mx-5'>
                <div className="items-center text-center">
                    <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-md bg-transparent mr-2" onChange={(e) => {
                        setFilter(e.target.value)
                    }}/>
                </div>
                <div className="h-[400px] overflow-auto flex flex-wrap gap-2 mt-3 mb-5 pr-2">
                {topics
                    .filter(topic => topic.title.toLowerCase().includes(filter.toLowerCase()))
                    .map((topic, index) => (
                    <Card
                        key={topic.id || index}
                        title={topic.title}
                        detail={topic.detail}
                        image={true}
                        imagelink={topic.image}
                        id={index.toString()}
                    />
                    ))}
                </div>
              </div>
            </>
          }
        />
      </div>
    )
}
export default Page2;