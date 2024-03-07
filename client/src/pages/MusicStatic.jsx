import React, { useState } from 'react';
import { Header } from '../components';
import DownloadAds from '../Statics/DownloadAds';
import VisibilitySensor from 'react-visibility-sensor';
import { motion } from 'framer-motion';
import Experience from '../Statics/Experience';
import Search from '../Statics/Search';
import Download from '../Statics/Download';
import Footer from '../Statics/Footer';

const MusicStatic = () => {
  const [elementIsVisible, setElementIsVisible] = useState(false);

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
      <Header />
      <VisibilitySensor onChange={(isVisible) => setElementIsVisible(isVisible)} minTopValue={300}>
        <div className="wrapper bg-[#081730] flex items-center justify-between px-[5rem] w-full h-[38rem] md:h-[48rem] relative z-[3] text-white">
          {/* left side */}
          <div className="headings flex flex-col items-start justify-center h-[100%] text-[3rem] md:w-1/2">
            <span>Experience The</span>{" "}
            <span>
              <b>Best Quality Music</b>
            </span>
            <span className="text-[15px] text-[#525D6E]">
              New music, New vibes, Get ready to groove
              <br />
              Feel the Beat-olutions
            </span>
            {/* download ads */}
            <div>
              <span className="text-[13px]">Download now on IOS and Android</span>
              <DownloadAds />
            </div>
          </div>
          {/* right side */}
          <div className="images relative hidden md:block md:w-1/2">
            <img
              src={require("../Images/p 1.png")}
              alt=""
              className="absolute top-[-15rem] h-[34rem] left-[13rem]"
            />
            <motion.img
              animate={`${elementIsVisible ? 'true' : 'false'}`}
              transition={{
                duration: 1,
                type: "ease-out",
              }}
              src={require("../Images/p 2.png")}
              alt=""
              className="absolute left-[235px] top-[94px] w-[175px]"
            />
            <motion.img
              animate={`${elementIsVisible ? 'true' : 'false'}`}
              transition={{
                type: "ease-out",
                duration: 1,
              }}
              src={require("../Images/p 3.png")}
              alt=""
              className="absolute w-[5rem] left-[13rem] top-[12rem]"
            />
            <motion.img
              animate={`${elementIsVisible ? 'true' : 'false'}`}
              transition={{
                type: "ease-out",
                duration: 1,
              }}
              src={require("../Images/p 4.png")}
              alt=""
              className="absolute w-[5rem] left-[12.5rem] top-[12rem]"
            />
          </div>
        </div>
      </VisibilitySensor>
      <div className="App text-white overflow-hidden w-full">
        <Experience />
      </div>
      <div className="App text-white overflow-hidden w-full">
        <Search />
      </div>
    </div>
  )
}

export default MusicStatic;
