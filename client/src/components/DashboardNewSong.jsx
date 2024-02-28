import React, {useEffect,useRef,useState} from 'react';
import { 
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import {BiCloudUpload} from "react-icons/bi";
import {MdDelete} from "react-icons/md";

import {storage} from "../config/firebase.config";
import {useStateValue} from "../context/StateProvider";
//import FilterButtons from "./FilterButtons";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import {actionType} from "../context/reducer";
//import {filterByLanguage, filter} from "../utils/supportfunctions";
//import {IoMusicalNote} from "react-icons/io5";
//import {AlertSuccess} from "./AlertSuccess";
//import AlertError from "./AlertError";

const DashboardNewSong = () =>{
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md">
        <div className='flex '>

        </div>
    </div>
  )
}

export default DashboardNewSong;