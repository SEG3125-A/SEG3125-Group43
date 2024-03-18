/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import CardDivided from "./cardDivided";
import ErrorAlert from "../ErrorAlert";
import useCredentials from './../../hooks/useCredentials';
import usePage from "../../hooks/usePage";
import useTopics from "../../hooks/useTopics";
import {getUserTopics} from "../../firebase/utils";

// SCRAPPED - Might add back later
function Page3 () {
  const [error, setError] = useState('');

    return (
      <div className='flex justify-center items-center h-full'>
        {error && <ErrorAlert error = {error} />}
        <CardDivided 
        divPosition={0.35}
        title="What type of user are you"
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
                
              </div>
            </>
          }
        />
      </div>
    )
}
export default Page3;