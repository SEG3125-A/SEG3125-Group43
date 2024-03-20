/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
// import LandingPage from '../components/landing/landingBody';

// Navbar component 
import Header from '../components/header/homenav';

// Footer component
import { HomeFooter } from '../components/footer/homefooter';

import { TopicsScroller } from '../components/landing/topicsscroller';

// Translation
import { useTranslation } from 'react-i18next';

// Similar to Skillshare's website, the landing page will have a hero section 
// with a call to action button, and a carousel of logos of companies that use weLearn.
const LandingPage: React.FC = () => {
  const videos = [
    {
      'title': 'painting', 
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710899197/painting_ho4eho.mp4'
    }, 
    {
      'title': 'auditorium',
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710842279/weLearn/home-banner-slide/nqy1fbvjgf5oclbep21q.mov'
    }, 
    {
      'title': 'programming', 
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710842253/weLearn/home-banner-slide/ewxqtehzoapc7jzvy7te.mp4',
    }, 
    {
      'title': 'cooking2', 
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710842271/weLearn/home-banner-slide/bw3z9ltj2krfc1zfbez5.mov',
    }, 
    {
      'title': 'running', 
      'url' : 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710842274/weLearn/home-banner-slide/e7jtsfixsdrgoqidw8o5.mp4'
    }, 
    {
      'title': 'programming2', 
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710899717/programming2_wzcf9e.mp4'
    },
    {
      'title': 'painting2',
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710842288/weLearn/home-banner-slide/myn7dgbwlzvpmwrsnmry.mp4'
    }, 
    {
      'title': 'yoga', 
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710842290/weLearn/home-banner-slide/oi2e1f1ctjahk1yhdle0.mp4', 
    }, 
    {
      'title': 'cooking3', 
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710842289/weLearn/home-banner-slide/jeb1qzunojjo83ebdknq.mp4'
    }, 
    {
      'title': 'painting3', 
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710899208/painting2_w9iwwj.mp4'
    }, 
    {
      'title': 'painting4', 
      'url': 'https://res.cloudinary.com/dwhd2rzqf/video/upload/v1710899197/painting_ho4eho.mp4'
    }
  ]

  const videoCount = videos.length;

    const { t } = useTranslation();
    const {i18n} = useTranslation();
    useEffect(() => {
      i18n.changeLanguage(localStorage.getItem('language') ?? 'ENG');
    }, [])

    useEffect(() => {
      const theme = localStorage.getItem('theme');
      theme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    }, [])

    useEffect(() => {
      document.title = "weLearn | " + t("Welcome to weLearn");
    })

    const [showButtons, setshowButtons] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
      const checkScroll = () => {
        setshowButtons(window.pageYOffset > window.innerHeight);
        setShowScrollTop(window.pageYOffset > window.innerHeight);
      };
  
      window.addEventListener('scroll', checkScroll);
  
      // Cleanup function
      return () => {
        window.removeEventListener('scroll', checkScroll);
      };
    }, []);

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const nextVideoIndex = (currentVideoIndex + 1) % videoCount;
    const videoRef = useRef<HTMLVideoElement>(null);
    const nextVideoRef = useRef<HTMLVideoElement>(null);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentVideoIndex(nextVideoIndex);
      }, 7000); // Change video every 7 seconds
  
      return () => clearInterval(intervalId); // Clean up on component unmount
    }, [nextVideoIndex]);
  
    useEffect(() => {
      if (nextVideoRef.current) {
        nextVideoRef.current.load();
      }
    }, [nextVideoIndex]);

    return (
      <div className=''>
      {showButtons && (
        <>
        <a href="/signup">
        <button className="fixed btn top-4 right-44 bg-primary-marine-blue dark:bg-primary-link-purp text-white px-8 py-2 rounded">
          {t("Signup")}
        </button>
        </a>
        <a href="/login">
        <button className="fixed btn top-4 right-4 bg-primary-marine-blue dark:bg-primary-link-purp text-white px-8 py-2 rounded">
          {t("Login")}
        </button>
        </a>
        </>
      )}
      {showScrollTop && ( 
        <>
        <button className="fixed btn-circle bottom-4 right-4 bg-primary-marine-blue dark:bg-primary-link-purp text-white p-3 rounded-full z-[999]" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        </>
      )}
        <div className="landing-page w-screen min-h-screen overflow-hidden bg-white dark:bg-dark-page-bg font-ubuntu">
        <Header />
        <div className="landing-content h-screen w-screen font-montserrat relative z-10 flex items-center justify-center overflow-hidden">
          <div className='max-h-screen z-20 overflow-hidden'>
            <video src={videos[currentVideoIndex].url} className="w-screen h-screen object-cover" autoPlay muted loop />
            <video ref={nextVideoRef} src={videos[nextVideoIndex].url} className="object-contain" style={{ display: 'none' }} muted loop />
          </div>
          <div className="left-column absolute ml-[42rem] z-30 overflow-hidden">
            <h1 className='font-bold text-5xl text-white'>{t('Welcome to weLearn 🌟')}</h1>
            <div className="landing-description text-white w-[30rem]">
              <p className='mt-5 text-2xl'>{t("bannertext")}</p>
            </div>

            <div className="landing-buttons flex items-center mt-5">
              <a href="/signup"><button className={`btn bg-primary-marine-blue  dark:bg-primary-link-purp text-neutral-magnolia px-6`} >{t(`Start your journey today!`)}</button></a>
              <a href="learnmore"><button className={`ml-10 btn bg-neutral-alabaster text-black hover:bg-neutral-light-gray`}>{t('Learn more...')}</button></a>
            </div>
          </div>
        </div>

        {/*Banner 1*/}
        <div className="h-banner-h overflow-hidden text-black dark:text-white bg-white dark:bg-dark-banner-bg flex justify-center items-center mr-[20px]">
          <div className='absolute left-0'>
            <img src="/logo.svg" alt="logo" className='w-72 h-80'/>
          </div>
          <div className={`flex flex-grow font-montserrat pl-[300px] overflow-hidden items-center justify-center`}>
            <div className={`flex-grow rounded-lg`} style={{flex: 0.4}}>
              <h1 className='text-5xl '>{t('Get Creative With weLearn')}</h1>
            </div>
            <div className="border-neutral-alabaster dark:border-dark-banner-bg h-full border-2">
              {/* Divider */}
            </div>
            <div className={`flex-grow justify-between font-bold`} style={{flex: 1 - 0.2, marginRight: 20}}>
              <p className='text-2xl mb-6'>{t('Learn from a wide range of courses, from programming to design, and more.')}</p>
              <p className='text-2xl mb-6'>{t('Tune in and level up at your own pace using our gameified learning system.')}</p>
              <p className='text-2xl mb-6'>{t('Connect with our global community and climb up the knowledge leaderboard.')}</p>
              <p className='text-2xl'>{t('Become an expert in your favorite subject with easy to get into and easy to understand learning material.')}</p>
            </div>
          </div>
        </div>

        {/* Topics Scroller */}
        <div>
          <div className="h-40 px-10 border-t border-b w-screen flex justify-center items-center bg-white dark:bg-dark-page-bg
          overflow-x-hidden overflow-y-hidden
          scrollbar-hide">
            <TopicsScroller />
           </div>
        </div>

        {/*Banner 2*/}
        <div className=''>
        <div className={`bg-dark-page-bg bg-logo-bg flex font-montserrat px-30 py-10 overflow-hidden align-center justify-center text-white dark:text-primary-marine-blue`} style={{backgroundSize: '200px 200px'}}>
            <div className='align-center justify-center text-center px-44 mt-6 dark:text-white'>
                <h1 className='text-5xl font-bold mb-8'>{t('Why students Love weLearn')}</h1>
                <p className='text-3xl mb-20'>{t("Whether it's a first brush on canvas or the last frame in an animation, weLearn is here to support you on every step of your creative journey.")}</p>
                <blockquote className='text-3xl mb-20'>
                    <p className='mb-10 font-bold'>"{t("I come to Skillshare for the curation and class quality. That's really worth the cost of membership to me.")}"</p>
                    <footer>{t("—Jason R, weLearn student")}</footer>
                </blockquote>
                <blockquote className='text-3xl mb-20'>
                    <p className='mb-10 font-bold'>"{t("I have an understanding that, even if the work is not perfect, it's a work in progress. And the reason why I'm on weLearn is to develop a skill. I feel that it's a safe space.")}"</p>
                    <footer>{t("—DeVeor R, weLearn student")}</footer>
                </blockquote>
                <blockquote className='text-3xl mb-20'>
                <p className='mb-10 font-bold'>"{t("weLearn has given me the opportunity to learn from experts in their field and explore new creative outlets. It's a game-changer!")}"</p>
                <footer>{t("—Emily S, weLearn student")}</footer>
                </blockquote>
                <blockquote className='text-3xl mb-20'>
                    <p className='mb-10 font-bold'>"{t("I love the variety of classes on weLearn. It allows me to explore different interests and learn at my own pace.")}"</p>
                    <footer>{t("—Alex M, weLearn student")}</footer>
                </blockquote>
                <a href="/dashboard"><button className='btn btn-lg bg-primary-marine-blue dark:bg-primary-link-purp text-primary-light-blue'>{t('Check out weLearn for Students')}</button></a>
            </div>
            
        </div>
        
        </div>

        {/* Banner 3 */}
        <div className='px-44 py-12 text-black dark:text-white dark:bg-dark-banner-bg'>
            <h1 className='justify-center text-center text-5xl font-bold mb-8 text-black dark:text-white'>{t('Frequently asked questions')}</h1>
            <div className="join join-vertical w-full">
              <div className="collapse collapse-arrow join-item border border-base-300 dark:border-white">
                <input type="radio" name="faq"/> 
                <div className="collapse-title text-xl font-medium">
                  {t('What is weLearn ?')}
                </div>
                <div className="collapse-content"> 
                  <p>{t('weLearn is an online learning platform that offers a wide range of courses in various subjects. It provides a gameified learning system to help users learn at their own pace. Additionally, weLearn has a global community where users can connect and interact with each other.')}</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300 dark:border-white">
                <input type="radio" name="faq" /> 
                <div className="collapse-title text-xl font-medium">
                  {t('How does weLearn work?')}
                </div>
                <div className="collapse-content"> 
                  <p>{t('weLearn works by providing a platform where users can access a wide range of courses in various subjects. You can either register as a learner or a teacher, and either follow or give lessons on our platform.')}</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300 dark:border-white">
                <input type="radio" name="faq" /> 
                <div className="collapse-title text-xl font-medium">
                  {t('How do I get started ?')}
                </div>
                <div className="collapse-content"> 
                  <p>{t("To get started, Create an account on weLearn by clicking on the 'Signup' button. Fill in the required information and create a username and password. Once you have created an account, you can log in by clicking on the 'Login' button. Enter your username and password to access your weLearn account. Once logged in, you can start exploring the wide range of courses available on weLearn. Then, browse through the different categories or use the search bar to find specific courses.")}</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300 dark:border-white">
                <input type="radio" name="faq" /> 
                <div className="collapse-title text-xl font-medium">
                  {t('How do I contact weLearn support?')}
                </div>
                <div className="collapse-content"> 
                  <p>{t('You can email support at the following email address: ')}</p>
                  <p>welearn@bbagel.mozmail.com</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300 dark:border-white">
                <input type="radio" name="faq" /> 
                <div className="collapse-title text-xl font-medium">
                  {t('Can I teach on weLearn ?')}
                </div>
                <div className="collapse-content"> 
                  <p>{t('Yes ! Simply apply to our teachers program after creating an account and follow the specified steps. Being a teacher on weLearn means making an impact on a generation of learners, and allows you to share your passion with others.')}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='overflow-hidden absolute'>
        <HomeFooter />
      </div>
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