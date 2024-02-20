import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../api';
import { actionType } from '../context/reducer';

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className='p-4 w-40 gap-3 height-auto rounded-lg shadow-md bg-blue-400'>
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor">{count}</p>
    </div>

  );
};

const DashboardHome = () => {
  const [{ allUsers, allArtists, allAlbums, allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists : data.artists,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums : data.album,
        });
      });
    }
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs : data.song,
        });
      });
    }
    
  }, [])

  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </div>
  )
}

export default DashboardHome
