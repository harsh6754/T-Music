import React, { useEffect, useRef, useState } from 'react';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
//import FilterButtons from "./FilterButtons";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { actionType } from "../context/reducer";
import FilterButtons from './FilterButtons';
import {filterByLanguage, filter} from "../utils/supportfunctions";
//import {IoMusicalNote} from "react-icons/io5";
//import {AlertSuccess} from "./AlertSuccess";
//import AlertError from "./AlertError";

const DashboardNewSong = () => {
  const [SongName, setSongName] = useState("");
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md gap-4">
      <input type="text"
        placeholder="type your song name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border-gray-300 bg-transparent"
        value={SongName}
        onChange={(e) =>
          setSongName(e.target.value)
        }
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={""} flag={"Artists"}/>
        <FilterButtons filterData={""} flag={"Albums"}/>
        <FilterButtons filterData={filterByLanguage} flag={"Language"}/>
        <FilterButtons filterData={filter} flag={"Category"}/>
      </div>
    </div>
  )
}

export default DashboardNewSong;