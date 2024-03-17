import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoTrash } from 'react-icons/io5'
import { deleteArtistById, deleteSongById, getAllArtists, getAllSongs } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { storage } from "../config/firebase.config";
import { ref } from "firebase/storage"

const SongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [{ alertType, allArtists, allAlbums, allSongs }, dispatch] = useStateValue();

  
  const deleteObject = () => {
    if (type === "songs") {

      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => { });

      deleteSongById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success"
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null
            })
          }, 5000);

          getAllSongs().then((data) => {
            console.log(data.song)
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.song,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger"
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null
            })
          }, 5000);
        }
      });
    }
    };

  return (
    <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'>
      <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL} className='w-full h-full rounded-lg object-cover' />

      </div>
      <p className='text-base text-center text-headingColor font-semibold my-2'>
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}

        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data.artist.length > 25 ? `${data.artist.slice(0, 25)}..` : data.artist}
          </span>
        )}
      </p>
      <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
        <motion.i
          whileTap={{ scale: 0.75 }}
          className='text-base text-red-400 drop-shadow-md hover:text-red-600'
          onClick={() => {
            setIsDelete(true)
          }}
        >
          <IoTrash />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Are you Sure do you want to delete Data?
          </p>
          <div className="flex items-center gap-4">
            <motion.button className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => {
                deleteObject(data)
              }}
            >
              Yes
            </motion.button>
            <motion.button className="px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() =>
                setIsDelete(false)
              }
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>

  )
}

export default SongCard
