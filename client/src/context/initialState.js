export const initialState = {
    user: null,
    allUsers: null,
    allSongs: null,
    allArtists: null,
    allAlbums: null,

    //Filter Types 
    filterTerm: "all",
    artistFilter:null,
    languageFilter:null,
    albumFilter:null, 

    //Alert Type
    alertType:null, 
    
    //Music Player
    isSongPlaying : false,
    songIndex : 0,
};