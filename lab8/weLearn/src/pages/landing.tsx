import React from 'react';
// import LandingPage from '../components/landing/landingBody';

// Navbar component 
import Header from '../components/header/authnav';

// Footer component
import Footer from '../components/footer/footer';

import '../landing.css';
// Translation
import { useTranslation } from 'react-i18next';


const LandingPage: React.FC = () => {

    const { t }= useTranslation();

    return (
      <div className="landing-page min-w-screen min-h-screen overflow-hidden bg-white dark:bg-dark-page-bg font-ubuntu">
        <Header type={'signup'} />

        <div className="landing-content ">

          <div className="left-column pt-36 px-20">

            <h1 className='font-bold text-5xl text-white'>{t('Welcome to weLearn 🌟')}</h1>
            <div className="landing-description text-white w-[30rem]">
                <p>{t('An innovative ed-tech platform redefining the landscape of online learning. By seamlessly fusing learning and play, we offer a customized journey through an educational experience unlike any other 🔥! With a large library of courses spanning a variety of topics, real-time progress tracking, and an ever growing community, weLearn is transforming education into the most captivating experience yet')}</p>
                </div>

            <div className="landing-buttons flex items-center mt-5">

            <a href="/signup"><button className={`btn bg-primary-link-purp  dark:bg-primary-link-purp text-neutral-magnolia px-6`} >{`Start your journey today!`}</button></a>

            <a href="learnmore"><button className={`ml-10 btn bg-neutral-alabaster text-black hover:bg-neutral-light-gray`}>
                    {'Learn more...'}
                </button>
            </a>

            </div>
          </div>
        </div>

        <div className='carasol text-center'>
            As seen on... 
        </div>

        <Footer />
      </div>
    );
  };
  
  export default LandingPage;

/* export default function Landing() {
    return (
        <div className='bg-white overflow-hidden'>
            <LandingPage type={'ENG'} />
        </div>
    )
} */