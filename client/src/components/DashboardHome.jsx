// import React from 'react'
// import { useEffect } from 'react';
// import { FaUsers } from "react-icons/fa";
// import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
// import { RiUserStarFill } from "react-icons/ri";
// import { getAllUsers, getAllAlbums, getAllArtist, getAllSongs } from '../api';
// import { actionType } from '../context/reducer';
// import { useStateValue } from '../context/StateProvider';
// import { bgColors } from '../utils/styles';

// export const DashboardCard = ({ icon, name, count }) => {
//   const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];
//   return (
//     <div
//       style={{ background: `${bg_color}` }}
//       className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
//     >
//       {icon}
//       <p className="text-xl text-textColor font-semibold">{name}</p>
//       <p className="text-sm text-textColor">{count}</p>
//     </div>
//   );

// }

// const DashboardHome = () => {
//   const [{ allUsers, allArtists, allSongs, allAlbums }, dispatch] = useStateValue();
//   useEffect(() => {
//     if (!allUsers) {
//       getAllUsers().then((data) => {
//         dispatch({
//           type: actionType.SET_ALL_USERS,
//           allUsers: data.data,
//         });
//       });
//     }
//     if (!allSongs) {
//       getAllSongs().then((data) => {
//         dispatch({
//           type: actionType.SET_ALL_SONGS,
//           allSongs: data.data,
//         });
//       });
//     }
//     if (!allArtists) {
//       getAllArtist().then((data) => {
//         dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
//       });
//     }
//     if (!allAlbums) {
//       getAllAlbums().then((data) => {
//         dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
//       });
//     }
//   })
//   return (
//     <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
//        <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
//       {/* prettier-ignore */}
//       <DashboardCard icon={<FaUsers className="text-3xl text-textColor" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />

//       {/* prettier-ignore */}
//       <DashboardCard icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

//       {/* prettier-ignore */}
//       <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"} count={allArtists?.length > 0 ? allArtists?.length : 0} />

//       {/* prettier-ignore */}
//       <DashboardCard icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
//     </div>
//     </div>

//   )
// }

// export default DashboardHome

import React, { useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi';
import { RiUserStarFill } from 'react-icons/ri';
import { getAllUsers, getAllAlbums, getAllArtists, getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { bgColors } from '../utils/styles';

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[Math.floor(Math.random() * bgColors.length)];
  return (
    <div
      style={{ background: bg_color }}
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center"
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allArtists, allSongs, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!allUsers) {
          const userData = await getAllUsers();
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: userData.data,
          });
        }
        if (!allSongs) {
          const songData = await getAllSongs();
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songData.data,
          });
        }
        if (!allArtists) {
          const artistData = await getAllArtists();
          dispatch({ type: actionType.SET_ARTISTS, artists: artistData.data });
        }
        if (!allAlbums) {
          const albumData = await getAllAlbums();
          dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: albumData.data });
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [allUsers, allSongs, allArtists, allAlbums, dispatch]);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUsers className="text-3xl text-textColor" />}
        name="Users"
        count={allUsers ? allUsers.length : 0}
      />
      <DashboardCard
        icon={<GiLoveSong className="text-3xl text-textColor" />}
        name="Songs"
        count={allSongs ? allSongs.length : 0}
      />
      <DashboardCard
        icon={<RiUserStarFill className="text-3xl text-textColor" />}
        name="Artist"
        count={allArtists ? allArtists.length : 0}
      />
      <DashboardCard
        icon={<GiMusicalNotes className="text-3xl text-textColor" />}
        name="Album"
        count={allAlbums ? allAlbums.length : 0}
      />
    </div>
  );
};

export default DashboardHome;
