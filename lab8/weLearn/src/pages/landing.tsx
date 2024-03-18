/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
// import LandingPage from '../components/landing/landingBody';

// Navbar component 
import Header from '../components/header/homenav';

// Footer component
import { HomeFooter } from '../components/footer/homefooter';

// Images
import Image1 from '../assets/images/cooking.jpeg';
import Image2 from '../assets/images/makeup.jpeg';
import Image3 from '../assets/images/digitalart.jpeg';
import Image4 from '../assets/images/film.jpeg';

// Translation
import { useTranslation } from 'react-i18next';

// Similar to Skillshare's website, the landing page will have a hero section 
// with a call to action button, and a carousel of logos of companies that use weLearn.
const LandingPage: React.FC = () => {

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

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      const checkScroll = () => {
        // Adjust this value according to the height of your banner
        setShowButton(window.pageYOffset > 500);
      };
  
      window.addEventListener('scroll', checkScroll);
  
      // Cleanup function
      return () => {
        window.removeEventListener('scroll', checkScroll);
      };
    }, []);

    return (
      <>
      {showButton && (
        <>
        <a href="/signup">
        <button className="fixed btn top-4 right-44 bg-primary-marine-blue dark:bg-primary-link-purp text-white px-8 py-2 rounded">
          {t("Sign Up")}
        </button>
        </a>
        <a href="/login">
        <button className="fixed btn top-4 right-4 bg-primary-marine-blue dark:bg-primary-link-purp text-white px-8 py-2 rounded">
          {t("Login")}
        </button>
        </a>
        </>
      )}
        <div className="landing-page min-w-screen min-h-screen overflow-hidden bg-white dark:bg-dark-page-bg font-ubuntu">
        <Header />
        <div className="landing-content h-[32rem] bg-landing-bg font-montserrat relative z-10 flex items-center justify-center">
          <div className='grid grid-cols-2 grid-rows-2 gap-4 absolute right-[calc(100%/12)] top-10 mb-[-10px] w-[750px] z-20'>
            <img src={Image1} alt="Image 1" className="w-full h-full object-cover" />
            <img src={Image2} alt="Image 2" className="w-full h-full object-cover" />
            <img src={Image3} alt="Image 3" className="w-full h-full object-cover" />
            <img src={Image4} alt="Image 4" className="w-full h-full object-cover" />
          </div>
          <div className="left-column -ml-[40rem] z-30">
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
        <div className="h-banner-h overflow-x-hidden text-black dark:text-white bg-white dark:bg-dark-banner-bg flex justify-center items-center">
          <div className='absolute left-0'>
            <img src="/logo.svg" alt="logo" className='w-72 h-80'/>
          </div>
          <div className={`flex flex-grow font-montserrat px-[300px] overflow-hidden items-center justify-center`}>
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

        {/*Banner 2*/}
        <div className={`h-large-banner-h bg-dark-page-bg bg-logo-bg flex font-montserrat px-48 py-10 overflow-hidden align-center justify-center text-white dark:text-primary-marine-blue`} style={{backgroundSize: '200px 200px'}}>
            <div className='align-center justify-center text-center px-44 dark:text-white'>
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
            </div>
        </div>
      </div>
      <HomeFooter />
      </>
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