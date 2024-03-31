/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, SVGProps } from 'react'

import { getCurrentUser, getGlobalExp, getProfilePicture, signUserOut } from '../../firebase/utils'
import { User } from 'firebase/auth';

import { useTranslation } from 'react-i18next';

// Alert
import Alert from '@mui/material/Alert';
import { Button, Stack } from '@mui/material';

function ProfilePicture({imagePreviewUrl}: {imagePreviewUrl?: string | null}) {
  // Don't forget to add the elemen to a wrapper div 
  // where you can change its size using w-profile and h-profile
  const [user, setUser] = useState<User | null>(null); 
  const [picture, setPicture] = useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [exp, setExp] = useState<number>(0);

  const { t } = useTranslation(); 

  useEffect(() => {
    const fetchProfilePicture = async () => {
        setUser(getCurrentUser());
        if (user) {
            const picture = await getProfilePicture(user.uid);
            setPicture(picture);
        }
    };

    const fetchExp = async () => {
        setUser(getCurrentUser());
        if (user) {
            const exp = await getGlobalExp(user?.uid);
            setExp(exp);
        }
    }
    fetchExp();
    fetchProfilePicture();
}, [user]);

  const [signOut, setSignOut] = useState(false);

  const handleSignOut = () => {
      if (signOut) {
          signUserOut(setLoading);
      } else {
          setSignOut(true);
      }
  }

  const undoSignOut = () => {
      setSignOut(false);
  }
  return (
    <>
      {signOut && (
                <div className='fixed left-1/2 top-[100px] -translate-x-64 font-montserrat'>
                    <Stack sx={{ width: '200%'}}>
                        <Alert
                            severity="info"
                            variant='filled'
                            
                            action={
                                <>
                                <Button color='inherit' size='small' onClick={() => {setSignOut(true); handleSignOut(); }}>
                                    YES
                                </Button>
                                <Button color="inherit" size="small" onClick={undoSignOut}>
                                    UNDO
                                </Button>  
                                </>
                            }
                        >
                            Confirm signout ? 
                        </Alert>
                    </Stack>
                </div>
        )}
        {!user && 
        <div className='items-center flex justify-center rounded-[50%] overflow-hidden'>
          <p className=''>
              <img src={imagePreviewUrl ? imagePreviewUrl : "/P.png"} />
          </p>
        </div>
        }

        {user && 
        <div>
            <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex w-profile-sm h-profile-sm overflow-hidden rounded-full">
              <div className='items-center flex justify-center rounded-[50%] overflow-hidden border-2'>
                <p className=''>
                    <img src={picture!} />
                </p>
              </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-dark-card-bg dark:border dark:text-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white`}
                      >
                        
                        Global Exp: {exp}
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white`}
                      >
                        
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                </div>
                
                
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white`}
                        onClick={handleSignOut}
                      >
                        
                        {t('Logout')}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        }
    </>
  )
}

export default ProfilePicture