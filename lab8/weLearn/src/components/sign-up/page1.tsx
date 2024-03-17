/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

// Components
import CardDivided from "./cardDivided";
import ErrorAlert from "../ErrorAlert";

// Hooks 
import useCredentials from './../../hooks/useCredentials';
import usePage from './../../hooks/usePage';

// Utils
import { updateCredentials } from "../../firebase/utils";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// Translation
import { useTranslation } from 'react-i18next';

// Fun stuff
import zxcvbn from 'zxcvbn';

function Page1 () {
  const {name, email, password, setName, setEmail, setPassword} = useCredentials();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const {page, setPage} = usePage();
  const { t } = useTranslation();

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (name && email && password && isChecked) {
      setName(name);
      setEmail(email);
      setPassword(password);
  }})

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailError(t('Invalid email format'));
    } else {
      setEmailError('');
      setEmail(email)
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.value;
    if (name.includes(' ')) {
      setUsernameError(t('Please use a hyphen or underscore to separate words.'));
    } else {
      setUsernameError('');
      setName(name);
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setPassword(e.target.value);
    setPasswordStrength(zxcvbn(password).score);
  };

  const getColorForStrength = (strength: number) => {
    switch (strength) {
      case 0:
        return t('Empty (or really bad)')
      case 1:
        return t('Weak');
      case 2:
        return t('Fair');
      case 3:
        return t('Strong');
      case 4:
        return t('Very strong');
      default:
        return 'gray';
    }
  };
    return (
      <div className='flex justify-center items-center h-full'>
        {error && <ErrorAlert error = {error} />}
        <CardDivided 
        divPosition={0.35}
        cardStyle="dark:bg-dark-card-bg dark:text-white dark:border-0"
        title={t("Enter your personal information")}
        titleStyle="text-[22px] text-center dark:text-white"

        rightStyle='flex flex-col py-10 mx-16 -px-10'

        nextBtn={true}
        nextBtnText={t('Continue with registration')}
        nextBtnDisabled={!email || !password || !name || !isChecked || !!usernameError || !!emailError}
        nextBtnFunction={() => {
          updateCredentials(name, email, password);
          setPage(page + 1)
        }}

        prevBtn={true}
        prevBtnText={t('Go Back')}

        googleSignup={true}

        childrenRight={
            <>
              <div className='mx-5 '>
                <div className='flex flex-col gap-4 w-full'>
                <label className=''>
                    <div className="label">
                      <span className='label-text text-primary-marine-blue dark:text-white'>
                        {t('Username')} {usernameError && <span className="text-red-500"> - {usernameError}</span>}
                        <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-xs text-md"><FontAwesomeIcon icon = {faQuestionCircle} /></div>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white dark:bg-dark-card-bg dark:border-2 rounded-box w-52">
                            <li><a className="text-black dark:text-white ">{t('Username cannot contains spaces.')}</a></li>
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
                      <span className='label-text text-primary-marine-blue dark:text-white'>
                        {t('Email Address')} {emailError && <span className="text-red-500"> - {emailError}</span>}
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
                      <span className='label-text text-primary-marine-blue dark:text-white'>
                        {t('Password')}
                        <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-xs text-md"><FontAwesomeIcon icon = {faQuestionCircle} /></div>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52  dark:bg-dark-card-bg dark:border-2">
                            <li><a className="text-black dark:text-white">{t('Avoid using simple words. Include symbols and numbers.')}</a></li>
                          </ul>
                        </div>
                      </span>
                    </div>
                    <input
                    type='password'
                    placeholder={t('Choose a strong password')}
                    onChange={handlePasswordChange} 
                    required
                    className='input input-bordered w-full bg-transparent'
                    />
                    <span>
                      <progress className="progress progress-primary w-full" value={`${passwordStrength * 25}`} max="100"></progress>
                    </span>
                    <span>
                      <p className="text-primary-marine-blue text-xs dark:text-neutral-magnolia">{t('Password strength')} - {getColorForStrength(passwordStrength)}</p>
                    </span>
                  </label>
                </div>
                <div className="mt-10 mb-10">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox" onChange={(e) => setIsChecked(e.target.checked)}/>
                    <span className="label-text ml-3">{t('By checking this box, you agreee to our')} <a className="text-primary-purplish-blue" href="">{t('Terms of Service')}</a> and <a className="text-primary-purplish-blue" href="">{t('Content and Privacy policies')}</a></span> 
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