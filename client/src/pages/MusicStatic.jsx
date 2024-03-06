import React,{useState} from 'react'
import { Header } from '../components'

import DownloadAds from "../Statics/DownloadAds";
import VisibilitySensor from 'react-visibility-sensor';
import { motion } from "framer-motion";
import Experience from '../Statics/Experience';

const MusicStatic = () => {
  const [elementIsVisible, setElementIsVisible] = useState(false);
  const bg = {
    true: {
      left: "7rem",
    },
    false: {
      left: "19rem",
    },
  };
  const musicPlayer = {
    true: {
      left: "295px",
    },
    false: {
      left: "235px",
    },
  };
  const rect = {
    true: {
      left: "11rem",
    },
    false: {
      left: "13rem",
    },
  }
  const heart = {
    true: {
      left: "9rem",
    },
    false: {
      left: "12.5rem",
    },
  };
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
    <Header/>
    <VisibilitySensor
      onChange={(isVisible) => setElementIsVisible(isVisible)}
      minTopValue={300}
    >
      <div className="wrapper bg-[#081730] flex items-center justify-between px-[5rem] rounded-b-[5rem] w-[100%] h-[38rem] relative z-[3] text-white">
        {/* left side */}
        <div className="headings flex flex-col items-start justify-center h-[100%] text-[3rem]">
          <span>Experience The</span>{" "}
          <span>
            <b>Best Qulaity Music</b>
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
        <div className="images relative w-[50%]">
          {/* <motion.img
            variants={bg}
            animate={`${elementIsVisible}`}
            transition={{ duration: 0, type: "ease-out" }}
            src={require("../Images/backgraphics.png")}
            alt=""
            className="absolute top-[-8rem] left-[19rem]"
          /> */}
          <img
            src={require("../Images/p 1.png")}
            alt=""
            className="absolute top-[-15rem] h-[34rem] left-[13rem]"
          />
          <motion.img
            variants={musicPlayer}
            animate={`${elementIsVisible}`}
            transition={{
              duration: 1,
              type: "ease-out",
            }}
            src={require("../Images/p 2.png")}
            alt=""
            className="absolute left-[235px] top-[94px] w-[175px]"
          />
          <motion.img
            variants={rect}
            animate={`${elementIsVisible}`}
            transition={{
              type: "ease-out",
              duration: 1,
            }}
            src={require("../Images/p 3.png")}
            alt=""
            className="absolute w-[5rem] left-[13rem] top-[12rem]"
          />
          <motion.img
            variants={heart}
            animate={`${elementIsVisible}`}
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
    </div>
  
  )
}

export default MusicStatic
