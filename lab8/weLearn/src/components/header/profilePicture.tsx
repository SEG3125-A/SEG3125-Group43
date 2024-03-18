/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

function ProfilePicture({imagePreviewUrl}: {imagePreviewUrl?: string}) {
  // Don't forget to add the elemen to a wrapper div 
  // where you can change its size using w-profile and h-profile
  return (
    <>
        <div className='items-center flex justify-center rounded-[50%] overflow-hidden'>
            <p className=''>
                <img src={imagePreviewUrl ? imagePreviewUrl : "/P.png"} />
            </p>
        </div>
    </>
  )
}

export default ProfilePicture