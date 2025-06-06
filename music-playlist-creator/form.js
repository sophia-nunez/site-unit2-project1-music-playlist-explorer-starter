import { fetchData, loadPlaylists } from './script.js';

let numSongs = 0;

function addSongSection(event) {
    event.preventDefault();
    const songSection = document.getElementById('song-section');

    const newSong = document.createElement('section');
    newSong.className = "song";

    newSong.innerHTML =
        `
            <label for="song-name${numSongs}">Song Name: </label>
            <input type="text" id="song-name${numSongs}" name="song-name${numSongs}">
        
            <br />
        
            <label for="artist-name${numSongs}">Song Artist: </label>
            <input type="text" id="artist-name${numSongs}" name="artist-name${numSongs}">

            <br />

            <label for="album-name${numSongs}">Album Name: </label>
            <input type="text" id="album-name${numSongs}" name="album-name${numSongs}">

            <br />

            <label for="song-length${numSongs}">Song Length: </label>
            <input type="text" id="song-length${numSongs}" name="song-length${numSongs}">

            <br />

            <label for="song-cover${numSongs}">Song Cover: </label>
            <input type="file" id="song-cover${numSongs}" name="song-cover${numSongs}" accept="image/png, image/jpeg" />
        `;

    songSection.insertBefore(newSong, songSection.firstChild);
    numSongs++;
}

async function handlePlaylistCreation(event) {
    event.preventDefault();
    let playlists = await fetchData();

    // playlist info
    const playlist_name = document.getElementById('playlist-name').value;
    const playlist_author = document.getElementById('author').value;
    const playlist_art = document.getElementById('cover-image').value;
    const songs = [];

    // song info, make a song for each song added
    for (i = 0; i < numSongs; i++) {
        const song_title = document.getElementById('song-name').value;
        const artist_name = document.getElementById('artist-name').value;
        const album_name = document.getElementById('album-name').value;
        const timestamp = document.getElementById('song-length').value;
        const song_cover = document.getElementById('song-cover').value;

        const newSong = {
            song_title,
            artist_name,
            album_name,
            timestamp,
            song_cover
        }

        songs.push(song_cover);
    }

    // make playlist object
    const newPlaylist = {
        playlistID: playlists.length,
        playlist_name,
        playlist_author,
        playlist_art,
        songs
    }

    numSongs = 0;
    playlists.unshift(newPlaylist);
    loadPlaylists();
    // const playlistCards = document.getElementById('playlist-cards');
    // playlistCards.insertBefore(createPlaylist(newPlaylist), playlistCards.firstChild);
}