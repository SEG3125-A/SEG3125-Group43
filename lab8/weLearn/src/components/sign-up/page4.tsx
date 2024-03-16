/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

// Components
import CardDivided from "./cardDivided";
import ErrorAlert from "../ErrorAlert";
import InfoAlert from "../InfoAlert";
import ProfilePicture from "../header/profilePicture";
import IsLoading from "../isLoading";

// Hooks
import { usePhoto } from "../../hooks/usePhoto";
import { createUser, getUserCredentials } from "../../firebase/utils";
import { useNavigate } from "react-router-dom";


function Page4 () {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // For authentication
  const {name, email, password} = getUserCredentials();
  
  const [error, setError] = useState('');
  const {photo, handleChange, imagePreviewUrl} = usePhoto();
  const [bio, setBio] = useState(''); 

  // For sanity check
  const[noPhoto, setNoPhoto] = useState(true);
  const [noBio, setNoBio] = useState(true);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState('');
  const [alertConfirm, setAlertConfirm] = useState(() => () => {});
  const [alertDeny, setAlertDeny] = useState(() => () => {});

  const sanityCheck = async () => {
    if (!photo && noPhoto) {
      setAlertText('Continue without a profile picture?');
      setAlertConfirm(() => () => { setNoPhoto(false); setShowAlert(false); });
      setAlertDeny(() => () => { setShowAlert(false); });
      setShowAlert(true);

      if (!bio && noBio) {
        setAlertText('Continue without a bio?');
        setAlertConfirm(() => () => { setNoBio(false); setShowAlert(false); });
        setAlertDeny(() => () => { setShowAlert(false); });
        setShowAlert(true);
        return;
      }
      return;
    }

    try {
      // First authenticate new user 
      await createUser(email, password, name, setLoading, photo, bio);

      // navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  }
    return (
      <div className='flex justify-center items-center h-full'>
        {/* ... */}
        {showAlert && <InfoAlert text={alertText} confirm={alertConfirm} deny={alertDeny} />}
        {error && <ErrorAlert error={error} />}
        {loading && <IsLoading />}
        {/* ... */}
        <CardDivided 
        divPosition={0.35}
        title="Customize your user profile"
        titleStyle="text-[22px] text-center"

        rightStyle='flex flex-col py-10 mx-16 -px-10'

        nextBtn={true}
        nextBtnText='Continue'
        nextBtnStyle="absolute bottom-10 ml-[130px]"
        nextBtnFunction={() => {
          sanityCheck()
        }}

        prevBtn={true}
        prevBtnText='Go Back'
        prevBtnStyle="absolute bottom-10 right-0 mr-[230px]"

        childrenRight={
            <>
            <div className="flex text-center align-center items-center ml-[125px] -mt-6 mb-3">
                <h1 className="text-xl text-center text-black">Almost there,&nbsp;</h1>
                <p className="text-xl text-primary-purplish-blue">{name ? name : 'undefined'}</p><p className="text-xl text-black">&nbsp;!</p>
            </div>
              <div className={`bg-white flex rounded-xl py-6 border-2 h-[480px] -mx-10 `}>
                <div className={`flex-grow`} style={{flex: 0.6}}>
                  <div className="text-center text-black">
                    <h1 className="text-xl">Add a profile pitcure !</h1>
                    <p className="px-2 mt-2">The best way to personalize your profile is with a descriptive picture.</p>
                  </div>
                  <div className='form-control w-full text-center align-center items-center mt-10 mb-24'>

                    <div className='w-profile-lg h-profile-md rounded-[50%]'>
                    <ProfilePicture imagePreviewUrl={imagePreviewUrl as string} /><br />
                    </div> 
                    <input type="file" className='file-input mt-16 w-[130px]' onChange={handleChange}/>
                  </div>
                </div>
                <div className="border-neutral-alabaster border-[1px]">
                  {/* Divider */}
                </div>
                <div className={`flex-grow text-center items-center align-center `} style={{flex: 1 - 0.5, paddingLeft: 20}}>
                    <div className=" -ml-5">
                      <label>
                        <p className="text-black mb-3 text-xl">Add a bio to your profile !</p>
                      </label>
                      <textarea className="textarea bg-transparent border-2 border-neutral-light-gray" placeholder="Bio" onChange={(e) => setBio(e.target.value)}></textarea>
                    </div>
                </div>
              </div>
            </>
          }
        />
      </div>
    )
}
export default Page4;