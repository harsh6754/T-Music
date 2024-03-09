import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { motion } from "framer-motion";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [{filterTerm, artistFilter, languageFilter, albumFilter}, dispatch] = useStateValue();


  const updateFilterDataValues = (name) => {
    setFilterMenu(false)
    setFilterName(name)

    if(flag === "Artists" ){
      dispatch({type:actionType.SET_ARTIST_FILTER,artistFilter:name})
    }

    if(flag === "Albums" ){
      dispatch({type:actionType.SET_ALBUM_FILTER,albumFilter:name})
    }

    if(flag === "Language" ){
      dispatch({type:actionType.SET_LANGUAGE_FILTER,languageFilter:name})
    }

    if(flag === "Category" ){
      dispatch({type:actionType.SET_FILTER_TERM,filterTerm:name})
    }
  }

  return (
    <div className='border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400'>
      <p className="text-base tracking-wide text-textColor flex items-center gap-2"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 9 ? `${filterName.name.slice(0, 9)}...` : filterName}
          </>
        )}

        <IoChevronDown className={`text-base text-textColor duration-150 transition-all ease-in-out ${filterMenu ? "rotate-180" : "rotate-1"}`} />

      </p>
      {filterData && filterMenu && (
        <motion.div 
        initial={{opacity : 0, y : 50}}
        animate = {{ opacity : 1, y:0}}
        exit={{opacity : 0, y : 50}}
        className="w-[150px] h-42 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll no-scrollbar scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-1 flex flex-col rounded-md shadow-md absolute top-8 left-0 ">
          {filterData?.map(data => (
            <div
              key={data.name}
              className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
              onClick={() => updateFilterDataValues(data.name)}
            >
              {(flag === "Artists" || flag === "Albums") && (
                <img
                  src={data.imageURL}
                  alt=""
                  className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                />
              )}
              <p className="w-full overflow-hidden whitespace-nowrap">
                {data.name.length > 9 ? `${data.name.slice(0, 9)}...` : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default FilterButtons;
