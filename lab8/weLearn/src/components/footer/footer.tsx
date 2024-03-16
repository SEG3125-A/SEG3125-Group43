/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faQuestionCircle, faVolumeMute, faLanguage } from '@fortawesome/free-solid-svg-icons'

export default function Footer () {
    const location = useLocation();
    return (
        <div className='absolute bottom-0 text-montserrat text-black justify-between flex w-screen px-12 mb-3'>
            <div>
                <p className='font-montserrat font-extrabold mt-5 cursor-pointer' onClick={() => (document.getElementById('tos') as HTMLDialogElement)?.showModal()}>Terms of Service</p>
                <dialog id="tos" className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg text-center">Terms of service</h3>
                    <div>
                        <p>1. Be nice</p>
                        <p>2. Be respectful</p>
                        <p>3. Be responsible</p>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                </dialog>
            </div>
            <div className='text-2xl justify-between space-x-8'>
                <FontAwesomeIcon icon = {faMoon} />
                <div className="dropdown dropdown-top dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-xl">
                        <FontAwesomeIcon icon = {faQuestionCircle} />
                    </div>
                    <div tabIndex={0} className="card compact dropdown-content bg-white z-[1] shadow rounded-box w-64">
                        <div tabIndex={0} className="card-body">
                            {location.pathname === '/' && 'Home page help'}
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon icon = {faVolumeMute} />
                <div className="dropdown dropdown-top dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1 text-xl bg-transparent text-black"><FontAwesomeIcon icon = {faLanguage} /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
                        <li><a>ENG</a></li>
                        <li><a>FRE</a></li>
                        <li><a>SPA</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}