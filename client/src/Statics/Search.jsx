import React, { useState } from "react";
import MusicPlayer from "./MusicPlayer";
import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

function Search() {
  const [elementIsVisible, setElementIsVisible] = useState(false);

  const bg = {
    true: {
      left: "-44rem",
    },
    false: {
      left: "-50rem",
    },
  };

  const redimg = {
    true: {
      left: "18rem",
    },
    false: {
      left: "16rem",
    },
  };

  const musicimg = {
    true: {
      left: "2rem",
    },
    false: {
      left: "6rem",
    },
  };

  return (
    <div className="search flex flex-col md:flex-row items-center justify-between relative h-full px-5 md:px-10 bg-[#081730] pt-36 pb-20 md:pt-48 md:pb-32">
      {/* left side */}
      <div className="left flex-1 relative">
        <motion.img
          variants={bg}
          animate={`${elementIsVisible}`}
          transition={{
            duration: 1,
            type: "ease-out",
          }}
          src={require("../Images/backgraphics.png")}
          alt=""
          className="absolute top-36 md:top-[22rem] left-[-47rem]"
        />
        <motion.img
          src={require("../Images/d1.png")}
          alt=""
          className="w-40 md:w-[16rem] top-44 md:top-[26rem] absolute"
        />
        <motion.img
          src={require("../Images/d2.png")}
          alt=""
          className="w-24 md:w-[9rem] absolute top-52.7 md:top-[32.7rem] left-28 md:left-[7rem]"
        />
        <motion.img
          variants={redimg}
          animate={`${elementIsVisible}`}
          transition={{
            duration: 1.2,
            type: "ease-out",
          }}
          src={require("../Images/d3.png")}
          alt=""
          className="w-24 md:w-[9rem] top-53 md:top-[33rem] left-36 md:left-[17rem] absolute"
        />
        <motion.img
          variants={musicimg}
          animate={`${elementIsVisible}`}
          transition={{
            duration: 1,
            type: "ease-out",
          }}
          src={require("../Images/d4.png")}
          alt=""
          className="w-44 md:w-[17rem] top-70 md:top-[50rem] left-8 md:left-[2rem] absolute"
        />
      </div>
      {/* right side */}
      <div className="right flex-1 flex flex-col items-start justify-start h-full pt-20 md:pt-0">
        {/* Search */}
        <div className="searchbar w-full flex items-center justify-start mb-7 md:mb-10">
          <input
            type="text"
            placeholder="Enter the keyword or URL"
            className="flex-1 outline-none bg-[#020917] rounded-xl p-3 h-12 md:h-[3rem]"
          />
          {/* SearchIcon */}
          <div className="searchIcon bg-gradient-to-bl from-[#F3071D] to-[#E600FF] rounded-xl ml-4 p-4 h-12 md:h-[3rem] flex items-center">
            <img
              src={require("../Images/search.png")}
              alt=""
              className="w-6 md:w-[1.5rem]"
            />
          </div>
        </div>
        {/* tilde icon */}
        <div className="tild flex items-center mb-7 md:mb-10">
          <img
            src={require("../Images/Path 318.png")}
            alt=""
            className="w-20 md:w-[5rem]"
          />
        </div>

        {/* paragraph */}
        <div className="detail text-2xl md:text-4xl mb-7 md:mb-10">
          <span>Search Music by</span>
          <span>
            <b>Name or Direct URL</b>
          </span>
          <span className="text-sm md:text-base mt-3 text-[#4D586A]">
            Duis feugiat congue metus, ultrices vulputate
            <br /> nibh viverra eget. Vestibulum ullamcorper
            <br /> volutpat varius.
          </span>
        </div>
        {/* Music Player */}
        <VisibilitySensor
          onChange={(isVisible) => setElementIsVisible(isVisible)}
        >
          <MusicPlayer />
        </VisibilitySensor>
      </div>
    </div>
  );
}

export default Search;
