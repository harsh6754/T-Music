import React from "react";
import Feature from "./Feature";

function Experience() {
  return (
    <div className="experience flex flex-col items-center justify-start px-5 md:px-20 bg-[#020917] min-h-screen pt-18rem md:mt-20rem relative z-2">
      {/* titld icon */}
      <img src={require("../Images/Path 318.png")} alt="" className="w-20 md:w-24" />
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-2xl md:text-3xl lg:text-4xl">
        <span>An Amazing App Can Change Your Daily Life</span>
        <span>
          <b>Music Experience</b>
        </span>
      </div>
      {/* features  */}
      <div className="feature flex flex-wrap items-center justify-around mt-6rem md:mt-8rem lg:mt-10rem max-w-5xl mx-auto">
        <Feature icon="Group 2" title="For Live Music" />
        <Feature icon="music icon" title="For Daily Music" />
        <Feature icon="Group 4" title="For Artists" />
      </div>
    </div>
  );
}

export default Experience;
