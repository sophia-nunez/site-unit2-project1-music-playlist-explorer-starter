function fetchData() {
  return fetch('./data/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

// Playlist JS
let playlists = []
fetchData().then(data => {
    playlists = data;
    console.log('playlist in fetch: ' + playlists);
    console.log('data in fetch: ' + data);
    
    if (document.body.classList.contains('home-page')) {
        loadHome(playlists);
    } else {
        loadFeatured(playlists);
    }
});

const playlistCards = document.getElementById('playlist-cards');
const modalContent = document.getElementById('modal-content');


function loadHome() {
    console.log('playlist in function: ' + playlists);
    loadPlaylists(playlists);

    const pageName = document.getElementById('page-name');
    pageName.textContent = 'All Playlists';

    // home page, make add button listender first
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', () => {
        openAddModal();
    })

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keyup', () => {
        searchPlaylists();
    })

    searchBar.addEventListener('search', () => {
        searchPlaylists();
    })

    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', () => {
        searchPlaylists();
    })

}

function loadPlaylists(playlists) {
    playlistCards.innerHTML = `
        <article id="add-container" class="playlist">
            <i id="add-btn" class="fa fa-plus" aria-hidden="true"></i>
        </article>
    `;
    // now load playlists
    if (playlists.length === 0) {
        const noLists = document.createElement('h3');
        noLists.textContent = 'No playlists added';
        noLists.id = 'no-lists';
        playlistCards.appendChild(noLists);
    } else {
        playlists.forEach(playlist => {
            let playlistCard = document.createElement('article');
            
            playlistCard.className = 'playlist';
            playlistCard.innerHTML = createPlaylistCard(playlist);
            playlistCards.appendChild(playlistCard);
            
            // add listener for modal to each playlist
            playlistCard.addEventListener('click', () => {
                openModal(playlist);
            })
        })
    }
}

function createPlaylistCard(playlist) {
    // const playlistCover = document.createElement('img')
    // playlistCover.className = "playlist-cover"
    // playlistCover.src = playlist.playlist_art

    playlistHTML = 
            `
            <div class="img-wrapper"><img class="playlist-cover" src="${playlist.playlist_art}"><i class="fa-solid fa-pencil playlist-icon" onclick="editPlaylist(event)" id="${playlist.playlistID}"></i><i class="fa fa-trash playlist-icon" aria-hidden="true" onclick="deletePlaylist(event)" id="${playlist.playlistID}"></i></img></div>
            <section class="card-info">
                <div class="card-text">
                    <h3 class="playlist-name">${playlist.playlist_name}</h3>
                    <p>${playlist.playlist_author}</p>
                </div>
                    <button class="like-container" onclick="likePlaylist(event)" data-id="${playlist.playlistID}"><i id="icon${playlist.playlistID}" class="fa-heart heart-icon ${playlist.liked ? "fa-solid" : "fa-regular"}"></i><span class="like-count">${playlist.liked ? "1" : "0"}</span></button>
            </section>
            `;


    return playlistHTML;
}

function likePlaylist(event) {
    event.stopPropagation(); // prevent modal from opening
    const likeButton = event.target;
    const heartIcon = likeButton.firstChild;
    const id = likeButton.dataset.id;
    
    const playlist = playlists.find(playlist => playlist.playlistID === id);
    
    console.log(playlist.liked);
    if (playlist.liked === false) {
        playlist.liked = !playlist.liked;
        // change icon based on current state
        heartIcon.className = "fa-solid fa-heart heart-icon";
        // update display
        likeButton.querySelector('.like-count').textContent = '1';

    } else {
        console.log('else');
        playlist.liked = false;
        heartIcon.className = "fa-regular fa-heart heart-icon";
        // update display
        likeButton.querySelector('.like-count').textContent = '0';
    }

    console.log(playlist.liked);
}

// Modal JS
const playlistModal = document.getElementById("playlist-modal");
const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    playlistModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == playlistModal) {
    playlistModal.style.display = "none";
  }

    if (event.target == addModal) {
        closeAddModal();
    }
}

const playlistCover = document.getElementById('playlist-cover');
const playlistName = document.getElementById('playlist-name');
const creatorName = document.getElementById('creator-name');
const songCover = document.getElementById('song-cover');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const albumName = document.getElementById('album-name');
const timeStamp = document.getElementById('timestamp');

const songCards = document.getElementById('song-cards');

function openModal(playlist) {

    playlistModal.style.display = "block";
    playlistCover.src = playlist.playlist_art;
    playlistName.textContent = playlist.playlist_name;
    creatorName.textContent = playlist.playlist_author;

    const shuffleBtn = document.getElementById('shuffle-btn');
    shuffleBtn.onclick = () => {shuffleSongs(playlist)};

    // songs 
    loadSongs(playlist.songs);
}

// clears modal and loads in current songs
function loadSongs(songs) {
    songCards.innerHTML = ''; // clears songs from modal
    songs.forEach(song => {
        let songCard = document.createElement('article');
                songCard.className = 'song-card';
                songCard.innerHTML = 
                    `
                        <div class="flex-container">
                            <img id="song-cover" src=${song.song_cover} alt="Song Cover Image" height="50px;"/>
                            <div>
                                <p id="song-title">${song.song_title}</p>
                                <p id="artist-name">${song.artist_name}</p>
                                <p id="album-name">${song.album_name}</p>
                            </div>
                        </div>
                        <div>
                            <p id="timestamp">${song.timestamp}</p>
                        </div>
                    `;
                songCards.appendChild(songCard);
    });
}

function shuffleSongs(playlist) {
    let shuffledSongs = playlist.songs;
    let updatedID = playlist.playlistID;
    // randomize array
    for (let i = shuffledSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]]; // Swap elements
    }

    // display shuffled array
    loadSongs(shuffledSongs);

}

// Featured JS
const featuredCard = document.getElementById('featured-container');


function loadFeatured() {    
    const pageName = document.getElementById('page-name');
    pageName.textContent = 'Featured Playlist';

    // get playlists and select random index
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const playlist = playlists[randomIndex];

    const playlistCard = document.getElementById('featured-container');

    // playlistCard.className = 'playlist';
    playlistCard.innerHTML = 
        `<div id="featured-playlist">
            <img class="featured-cover" src="${playlist.playlist_art}"></img>
            <div>
                <h3 class="playlist-name">${playlist.playlist_name}</h3>
                <p>${playlist.playlist_author}</p>
            </div>
        </div>
        <div id="featured-songs"></div>
        `;

    playlist.songs.forEach(song => {
        let featuredSongsCard = document.getElementById('featured-songs');
        let songCard = document.createElement('article');
                songCard.className = 'song-card';
                songCard.innerHTML = 
                    `
                        <div class="flex-container">
                            <img id="song-cover" src=${song.song_cover} alt="Song Cover Image" height="50px;"/>
                            <div>
                                <p id="song-title">${song.song_title}</p>
                                <p id="artist-name">${song.artist_name}</p>
                                <p id="album-name">${song.album_name}</p>
                            </div>
                        </div>
                        <div>
                            <p id="timestamp">${song.timestamp}</p>
                        </div>
                    `;
                featuredSongsCard.appendChild(songCard);
    });
}

// stretch features
function editPlaylist(event) {
    event.stopPropagation();

    // find playlist by id
    const playlist = playlists.find(playlist => playlist.playlistID === event.target.id);
        
    openEditModal(playlist);
}

function deletePlaylist(event) {
    event.stopPropagation();

    // filter out the playlist with the id that matches
    playlists = playlists.filter(playlist => playlist.playlistID !== event.target.id);
    // reload playlists
    loadPlaylists(playlists);
}

// Add Playlists
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

function handlePlaylistCreation(event) {
    event.preventDefault();
    console.log('playlist created');

    // playlist info
    const playlist_name = document.getElementById('playlist-new-name').value;
    const playlist_author = document.getElementById('author').value;
    const playlist_art = "assets/img/playlist.png"; // document.getElementById('cover-image').value;
    const songs = [];

    // song info, make a song for each song added
    for (i = 0; i < numSongs; i++) {
        const song_title = document.getElementById(`song-name${i}`).value;
        const artist_name = document.getElementById(`artist-name${i}`).value;
        const album_name = document.getElementById(`album-name${i}`).value;
        const timestamp = document.getElementById(`song-length${i}`).value;

        //const song_cover = document.getElementById('song-cover').value;

        const newSong = {
            song_title,
            artist_name,
            album_name,
            timestamp,
            song_cover: 'assets/img/playlist.png'
        }

        songs.push(newSong);
    }

    // make playlist object
    const newPlaylist = {
        playlistID: '' + playlists.length,
        playlist_name,
        playlist_author,
        playlist_art,
        songs,
        likes: 0,
        liked: false
    }

    numSongs = 0;
    playlists.unshift(newPlaylist);

    closeAddModal();
    document.getElementById('no-lists').remove();
    loadPlaylists(playlists);
    // const playlistCards = document.getElementById('playlist-cards');
    // playlistCards.insertBefore(createPlaylist(newPlaylist), playlistCards.firstChild);
}

// Add Modal
const addModal = document.getElementById("add-modal");
function openAddModal() {
    addModal.style.display = 'block';
    document.getElementById('add-form').onsubmit = (event) => {
        handlePlaylistCreation(event);
    };
}

function closeAddModal() {
    const playlist_name = document.getElementById('playlist-new-name');
    const playlist_author = document.getElementById('author');
    const playlist_art = document.getElementById('cover-image');

    document.getElementById('current-cover').src = "";
    playlist_name.value = '';
    playlist_author.value = '';
    playlist_art.value = '';

    addModal.style.display = "none";
    addModal.style.pointerEffects = "none";
}

const addSpan = document.getElementsByClassName('close')[1];

addSpan.onclick = function() {
    closeAddModal();
}

// Editing helpers
function openEditModal(playlist) {
    addModal.style.display = 'block';
    document.getElementById('add-form').onsubmit = (event) => {
        editPlaylistSubmission(event);
    }
    const submitBtn = document.getElementById('add-submit');
    submitBtn.className = playlist.playlistID;
    
    const playlist_name = document.getElementById('playlist-new-name');
    const playlist_author = document.getElementById('author');
    const playlist_art = document.getElementById('cover-image');
    
    document.getElementById('current-cover').src = `${playlist.playlist_art}`
    playlist_name.value = `${playlist.playlist_name}`;
    playlist_author.value = `${playlist.playlist_author}`;
    playlist_art.value = `${playlist.playlist_art}`;
}

// TODO: add functionality to edit songs and cover
function editPlaylistSubmission(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('add-submit');
    const playlistId = submitBtn.className;
    const playlist = playlists.find(playlist => playlist.playlistID === playlistId);

    if (!playlist) {
        console.error('Playlist not found');
        return;
    }

    // playlist info
    const playlist_name = document.getElementById('playlist-new-name').value;
    const playlist_author = document.getElementById('author').value;
    // const playlist_art = "assets/img/playlist.png"; // document.getElementById('cover-image').value;
    // const songs = [];

    // song info, make a song for each song added
    // for (i = 0; i < numSongs; i++) {
    //     const song_title = document.getElementById(`song-name${i}`).value;
    //     const artist_name = document.getElementById(`artist-name${i}`).value;
    //     const album_name = document.getElementById(`album-name${i}`).value;
    //     const timestamp = document.getElementById(`song-length${i}`).value;

    //     //const song_cover = document.getElementById('song-cover').value;

    //     const newSong = {
    //         song_title,
    //         artist_name,
    //         album_name,
    //         timestamp,
    //         song_cover: 'assets/img/playlist.png'
    //     }

    //     songs.push(newSong);
    // }

    // update playlist object
    playlist.playlist_name = playlist_name;
    playlist.playlist_author = playlist_author;
    // playlist.playlist_art = playlist_art; // base64 or file path
    // playlist.songs = updatedSongsArray;

    numSongs = 0;
    loadPlaylists(playlists);

    closeAddModal();
}


// Search
function searchPlaylists() {
    const input = document.getElementById('search-bar');
    const filter = input.value.toLowerCase();

    const filtered = playlists.filter(playlist =>
        playlist.playlist_name.toLowerCase().includes(filter) ||
        playlist.playlist_author.toLowerCase().includes(filter)
    );

    loadPlaylists(filtered);
}

// Sorting
function sortNames() {
    const sortBtn = document.getElementById('sort-name');
    sortBtn.style.backgroundColor = 'black';
    sortBtn.style.color = '#e9e2f5';

    // reset the others
    const otherBtn1 = document.getElementById('sort-likes');
    otherBtn1.style.backgroundColor = '#1d013b';
    otherBtn1.style.color = '#d3c2f1';
    const otherBtn2 = document.getElementById('sort-date');
    otherBtn2.style.backgroundColor = '#1d013b';
    otherBtn2.style.color = '#d3c2f1';

    let sortedPlaylists = [...playlists];

    sortedPlaylists.sort((a, b) =>
        {
            return a.playlist_name.toLowerCase().localeCompare(b.playlist_name.toLowerCase())
        });

    loadPlaylists(sortedPlaylists);
}

function sortLikes() {
    const sortBtn = document.getElementById('sort-likes');
    sortBtn.style.backgroundColor = 'black';
    sortBtn.style.color = '#e9e2f5';

    // reset the others
    const otherBtn1 = document.getElementById('sort-name');
    otherBtn1.style.backgroundColor = '#1d013b';
    otherBtn1.style.color = '#d3c2f1';
    const otherBtn2 = document.getElementById('sort-date');
    otherBtn2.style.backgroundColor = '#1d013b';
    otherBtn2.style.color = '#d3c2f1';

    let sortedPlaylists = [...playlists];

    const likeButtons = document.querySelectorAll('.like-container');
    sortedPlaylists.sort((a, b) => {
        
            // change to boolean - liked is true, not is false
            // const likedA = a.liked === 'true';
            // const likedB = b.liked === 'true';
        
            // sort liked as first
            return a.liked === b.liked ? 0 : a.liked ? -1 : 1;
        });

    loadPlaylists(sortedPlaylists);
}

function sortDates() {
    const sortBtn = document.getElementById('sort-date');
    sortBtn.style.backgroundColor = 'black';
    sortBtn.style.color = '#e9e2f5';

    // reset the others
    const otherBtn1 = document.getElementById('sort-likes');
    otherBtn1.style.backgroundColor = '#1d013b';
    otherBtn1.style.color = '#d3c2f1';
    const otherBtn2 = document.getElementById('sort-name');
    otherBtn2.style.backgroundColor = '#1d013b';
    otherBtn2.style.color = '#d3c2f1';

    // array comes with playlists in order they were added :)
    loadPlaylists(playlists);
}