import React from 'react';

function DownloadAds() {
    return (
        <div className="download flex flex-col md:flex-row items-center justify-center mt-8 md:mt-0">
            <img
                src={require("../Images/App Store.png")}
                alt=""
                className="border-2 border-[#232A4E] rounded-[13px] h-16 md:h-24 w-32 md:w-40 cursor-pointer mb-4 md:mb-0 md:mr-4"
            />
            <img
                src={require("../Images/Google Play.png")}
                alt=""
                className="border-2 border-[#232A4E] rounded-[13px] h-16 md:h-24 w-32 md:w-40 cursor-pointer"
            />
        </div>
    );
}

export default DownloadAds;
