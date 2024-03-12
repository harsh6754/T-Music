import React, { useEffect, useRef, useState } from 'react';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload, BiFemaleSign } from "react-icons/bi";
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

  //Image Upload State
  const [imageUploadProgress, setImageUplaodProgress] = useState(0);
  const [songImageCover, setSongImageCover] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  //Audio Uplaod State
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [audioURLCover, setAudioURLCover] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);


  // Artist Image Upload State
  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("")
  const [isTwitter, setTwitter] = useState("");
  const [isInstagram, setInstagram] = useState("");

  //Album Image Upload State
  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("")

  //All Artist Or Albums Value State
  const [{ allArtists, allAlbums, filterTerm, artistFilter, languageFilter, albumFilter, allSongs }, dispatch] = useStateValue();

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
  }, []);

  //Delete Image Or Audio Data
  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
      setIsAudioLoading(true);
      setIsArtistUploading(true);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setSongImageCover(null);
      setAudioURLCover(null);
      setIsImageLoading(false);
      setIsAudioLoading(false);
      setArtistImageCover(null);
      setIsArtistUploading(false);
    });
  };

  //Save Song Data
  const saveSong = () => {
    if (!songImageCover || !audioURLCover) {
      //Alert Message
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: SongName,
        imageURL: songImageCover,
        songURL: audioURLCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };

      saveNewSong(data).then(res => {
        getAllSongs().then(songs => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs.song
          });
        });
      });

      setSongName(null);
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setSongImageCover(null);
      setAudioURLCover(null);
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    };
  };


  const saveArtist = () => {
    if (!artistImageCover || !artistName || !isTwitter || !isInstagram) {
      //Alert Msg
    } else {
      setIsArtistUploading(true);
      const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: isTwitter,
        instagram: isInstagram,
      }

      saveNewArtist(data).then(res => {
        getAllArtists().then(artists => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: artists.artists,
          });
        });
      });

      setIsArtistUploading(false);
      setArtistName("")
      setTwitter("");
      setInstagram("");
      setArtistUploadingProgress(false);
      setArtistImageCover(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md gap-4" >
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

      {/* Image Uploder */}
      <p className="text-xl font-semibold text-headingColor">
        Songs Details
      </p>
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
              <div className="relative w-full h-full overflow-hide">
                <img
                  src={songImageCover}
                  className="w-full h-full object-cover flex-auto"
                  alt=""
                />
                <button
                  type="button"
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileObject(songImageCover, true)}
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio Uploader */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAudioLoading && <FileLoader progress={audioUploadProgress} />}
        {!isAudioLoading && (
          <>
            {!audioURLCover ? (
              <FileUploader
                updateState={setAudioURLCover}
                setProgress={setAudioUploadProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full overflow-hide flex items-center justify-center">
                <audio
                  src={audioURLCover}
                  controls
                />

                <button
                  type="button"
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileObject(audioURLCover, false)}
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Button Section */}
      <div className="flex items-center justify-center w-50 p-4 cursor-pointer">
        {isImageLoading || isAudioLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className='w-full px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg '
            onClick={saveSong}
          >
            Save Song
          </motion.button>
        )}
      </div>

      {/* Image Uploader For Artist */}
      <p className="text-xl font-semibold text-headingColor">
        Artist Details
      </p>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isArtistUploading && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState={setArtistImageCover}
                setProgress={setArtistUploadingProgress}
                isLoading={setIsArtistUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hide">
                <img
                  src={artistImageCover}
                  className="w-full h-full object-cover flex-auto"
                  alt=""
                />
                <button
                  type="button"
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileObject(artistImageCover, true)}
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Artist Name */}
      <input type="text"
        placeholder="Artist name..."
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border-gray-300 bg-transparent"
        value={artistName}
        onChange={(e) =>
          setArtistName(e.target.value)
        }
      />

      {/* Twitter URL */}
      <div class="flex items-center rounded-md p-1 border border-gray-300 w-full ">
        <p class="text-base font-semibold text-gray-500">www.twitter.com/</p>
        <input type="text" placeholder="your twitter id..."
          className="w-full text-base font-semibold text-textColor bg-transparent outline-none border-none "
          value={isTwitter}
          onChange={(e) =>
            setTwitter(e.target.value)
          }
        />
      </div>

      {/* Instagram URL */}
      <div class="flex items-center rounded-md p-1 border border-gray-300 w-full">
        <p class="text-base font-semibold text-gray-500">www.instagram.com/</p>

        <input type="text" placeholder="your instagram id..."
          className="w-full text-base font-semibold text-textColor bg-transparent outline-none border-none"
          value={isInstagram}
          onChange={(e) =>
            setInstagram(e.target.value)
          }
        />
      </div>

      {/* Button Section */}
      <div className="flex items-center justify-center w-50 p-4 cursor-pointer">
        {isArtistUploading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className='w-full px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg '
            onClick={saveArtist}
          >
            Save Artist
          </motion.button>
        )}
      </div>
    </div>
  );
};

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

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