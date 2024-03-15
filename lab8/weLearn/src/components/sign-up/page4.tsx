/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import CardDivided from "./cardDivided";
import ErrorAlert from "../ErrorAlert";
import useCredentials from './../../hooks/useCredentials';
import usePage from "../../hooks/usePage";


function Page1 () {
  const {name, email, password, setName, setEmail, setPassword} = useCredentials();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
    return (
      <div className='flex justify-center items-center h-full'>
        {error && <ErrorAlert error = {error} />}
        <CardDivided 
        divPosition={0.35}
        title="Enter your personal information"
        titleStyle="text-[22px] text-center"

        rightStyle='flex flex-col py-10 mx-16 -px-10'

        nextBtn={true}
        nextBtnText='Continue with registration'
        nextBtnDisabled={!email || !password || !name || !isChecked}

        prevBtn={true}
        prevBtnText='Go Back'
        prevBtnStyle="disabled"

        googleSignup={true}

        childrenRight={
            <>
              <div className='mx-5'>
                <div className='flex flex-col gap-4 w-full'>
                <label className=''>
                    <div className="label">
                      <span className='label-text text-primary-marine-blue'>Name</span>
                    </div>
                    <input
                    type='input'
                    placeholder='e.g. Stephen King'
                    onChange={(e) => setName(e.target.value)}
                    className='input input-bordered w-full bg-transparent'
                    />
                  </label>
                  <label className=''>
                    <div className="label">
                      <span className='label-text text-primary-marine-blue'>Email Address</span>
                    </div>
                    <input
                    type='email'
                    placeholder='e.g. stephenking@lorem.com'
                    onChange={(e) => setEmail(e.target.value)}
                    className='input input-bordered w-full bg-transparent'
                    required
                    />
                  </label>
                  <label className=''>
                    <div className="label">
                      <span className='label-text text-primary-marine-blue'>Password</span>
                    </div>
                    <input
                    type='password'
                    placeholder='Choose a strong password'
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    className='input input-bordered w-full bg-transparent'
                    />
                  </label>
                </div>
                <div className="mt-10 mb-10">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox" onChange={(e) => setIsChecked(e.target.checked)}/>
                    <span className="label-text ml-3">By checking this box, you agreee to our <a className="text-primary-purplish-blue" href="">Terms of Service</a> and <a className="text-primary-purplish-blue" href="">Content and Privacy policies</a></span> 
                  </label>
                </div>
                </div>
              </div>
            </>
          }
        />
      </div>
    )
}
export default Page1;