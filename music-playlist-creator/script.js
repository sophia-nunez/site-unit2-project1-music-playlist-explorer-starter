// Playlist JS
const playlistCards = document.getElementById('playlist-cards');
const modalContent = document.getElementById('modal-content');

async function fetchData() {
       try {
           const response = await fetch('./data/data.json');
           if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
           }
           const data = await response.json();
           return data;
       } catch (error) {
           console.error('Fetch error:', error);
       }
   }

async function loadPlaylists() {
    // home page
    const playlists = await fetchData();
    if (playlists.length === 0) {
        const noLists = document.createElement('h3');
        noLists.textContent = 'No playlists added';
    } else {
        playlists.forEach(playlist => {
            let playlistCard = document.createElement('article');
            const playlistCover = document.createElement('img')
            playlistCover.className = "playlist-cover"
            playlistCover.src = playlist.playlist_art

            playlistCard.className = 'playlist';
            playlistCard.innerHTML = 
            `
            <img class="playlist-cover" src="${playlist.playlist_art}" />
            <section class="card-info">
                <div class="card-text">
                    <h3 class="playlist-name">${playlist.playlist_name}</h3>
                    <p>${playlist.playlist_author}</p>
                </div>
                <button class="like-container" onclick="likePlaylist(event)" data-liked="false"><i id="icon" class="fa-regular fa-heart heart-icon"></i><span class="like-count">${playlist.likes}</span></button>
            </section>
            `;
            playlistCards.appendChild(playlistCard);

            // add listener for modal to each playlist
            playlistCard.addEventListener('click', () => {
                openModal(playlist);
            })
        })
    }
}

function likePlaylist(event) {
    event.stopPropagation(); // prevent modal from opening
    const likeButton = event.target;
    const heartIcon = likeButton.firstChild;
    if (likeButton.dataset.liked === "false") {
        likeButton.dataset.liked = "true";
        // change icon based on current state
       heartIcon.className = "fa-solid fa-heart heart-icon"
       // update display
        likeButton.querySelector('.like-count').textContent = '1';

    } else {
        likeButton.dataset.liked = "false";
        heartIcon.className = "fa-regular fa-heart heart-icon";
        // update display
        likeButton.querySelector('.like-count').textContent = '0';
    }
}

// Modal JS
const modal = document.getElementById("playlist-modal");
const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
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

    modal.style.display = "block";
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

async function shuffleSongs(playlist) {
    let playlists = await fetchData();
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


async function loadFeatured() {
    // get playlists and select random index
    const playlists = await fetchData();
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const playlist = playlists[randomIndex];

    const playlistCard = document.getElementById('featured-container');
    //const playlistCard = document.createElement('article');
    // const playlistCover = document.createElement('img');
    // playlistCover.className = "playlist-cover";
    // playlistCover.src = playlist.playlist_art;

    // playlistCard.className = 'playlist';
    playlistCard.innerHTML = 
    `
    <img class="playlist-cover" src="${playlist.playlist_art}" />
    <section class="card-text">
        <h3>${playlist.playlist_name}</h3>
        <p>${playlist.playlist_author}</p>
        <button class="like-container" onclick="likePlaylist(event)" data-liked="false"><i id="icon" class="fa-regular fa-heart heart-icon"></i>${playlist.likes}</button>
    </section>
    `;

    // add listener for modal to each playlist
    playlistCard.addEventListener('click', () => {
        openModal(playlist);
    })
}