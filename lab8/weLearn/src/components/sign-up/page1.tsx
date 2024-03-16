/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import CardDivided from "./cardDivided";
import ErrorAlert from "../ErrorAlert";
import useCredentials from './../../hooks/useCredentials';
import usePage from './../../hooks/usePage';
import { updateCredentials } from "../../firebase/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";


function Page1 () {
  const {name, email, password, setName, setEmail, setPassword} = useCredentials();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const {page, setPage} = usePage();

  console.log(name, email, password,)

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('')

  useEffect(() => {
    if (name && email && password && isChecked) {
      setName(name);
      setEmail(email);
      setPassword(password);
  }})

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
      setEmail(email)
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if(name.includes(' ')) {
      setUsernameError('Please use a hyphen or underscore to separate words.');
    } else {
      setUsernameError('');
      setName(name);
    }
  }
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
        nextBtnDisabled={!email || !password || !name || !isChecked || !!usernameError || !!emailError}
        nextBtnFunction={() => {
          updateCredentials(name, email, password);
          setPage(page + 1)
        }}

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
                      <span className='label-text text-primary-marine-blue'>
                        Username {usernameError && <span className="text-red-500"> - {usernameError}</span>}
                        <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-xs text-md"><FontAwesomeIcon icon = {faQuestionCircle} /></div>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
                            <li><a className="text-black">Username cannot contains spaces.</a></li>
                          </ul>
                        </div>
                        </span>
                    </div>
                    <input
                    type='input'
                    placeholder='e.g. stephen-king'
                    onChange={handleNameChange}
                    className='input input-bordered w-full bg-transparent'
                    />
                  </label>
                  <label className=''>
                    <div className="label">
                      <span className='label-text text-primary-marine-blue'>
                        Email Address {emailError && <span className="text-red-500"> - {emailError}</span>}
                      </span>
                    </div>
                    <input
                    type='email'
                    placeholder='e.g. stephenking@lorem.com'
                    onChange={handleEmailChange}
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