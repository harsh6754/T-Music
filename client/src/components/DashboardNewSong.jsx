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
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { actionType } from "../context/reducer";
import FilterButtons from './FilterButtons';
import { filterByLanguage, filter } from "../utils/supportfunctions";
//import {IoMusicalNote} from "react-icons/io5";
//import {AlertSuccess} from "./AlertSuccess";
//import AlertError from "./AlertError";

const DashboardNewSong = () => {
  const [SongName, setSongName] = useState("");
  const [imageUploadProgress, setImageUplaodProgress] = useState(0);
  const [songImageCover, setSongImageCover] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [{ allArtists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {

    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists
        })
      })
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        })
      })
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md gap-4">
      <input type="text"
        placeholder="Type your song name..."
        className="w-full p-1 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border-gray-300 bg-transparent"
        value={SongName}
        onChange={(e) =>
          setSongName(e.target.value)
        }
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={allArtists} flag={"Artists"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filter} flag={"Category"} />
      </div>

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageLoading && <FileLoader progress={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setImageUplaodProgress}
                isLoading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className="">
                     
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className='w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative'>
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl">
          
        </div>
      </div>
    </div>
  )
}

export const FileUploader = ({ updateState, setProgress, isLoading, isImage }) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const storageRef = ref(storage, `${isImage ? "Images" : "Audio"}/${Date.now()}-${uploadedFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    uploadTask.on("state_changed", (snapshot) => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        })
      })
  }
  return (
    <label>
      <div className='flex flex-col items-center justify-center h-full'>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to Upload {isImage ? "Image" : "Audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className={"w-0 h-0"}
        onChange={uploadFile}
      />
    </label>
  )
}

export default DashboardNewSong;