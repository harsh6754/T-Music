import React from "react";
import DownloadAds from "./DownloadAds";

function Download() {
  return (
    <div className="flex flex-col items-center justify-start px-5 md:px-20 bg-[#020917] min-h-screen pt-18rem md:mt-[-10rem] relative z-0 rounded-b-5rem">
      {/* tild icon or path icon */}
      <img src={require("../Images/Path 318.png")} alt="" className="w-20 md:w-24" />
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-2xl md:text-3xl lg:text-4xl text-center">
        <span>Download The Best Music</span>
        <span>
          <b>App Now!</b>
        </span>
        <span className="text-white-400 px-4 lg:px-24 mt-4">
          Duis feugiat congue metus, ultrices vulputate nibh viverra eget.
          Vestibulum ullamcorper volutpat varius.
        </span>
      </div>
      {/* download ads */}
      <div className="mt-14">
        <DownloadAds />
      </div>
    </div>
  );
}

export default Download;
