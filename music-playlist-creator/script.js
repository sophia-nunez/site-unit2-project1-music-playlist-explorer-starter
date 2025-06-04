// Playlist JS
const playlistCards = document.getElementById('playlist-cards');
const modalContent = document.getElementById('modal-content');

fetch('./data/data.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response failed.');
    }
    return response.json();
})
.then(playlists => {
    // home page
    if (playlists.length === 0) {
        const noLists = document.createElement('h3');
        noLists.textContent = 'No playlists added';
    } else {
        playlists.forEach(playlist => {
            let playlistCard = document.createElement('article');
            playlistCard.className = 'playlist';
            playlistCard.innerHTML = 
            `
            <img class="playlist-cover" src="${playlist.playlist_art}" />
            <section class="card-text">
            <h3>${playlist.playlist_name}</h3>
            <p>${playlist.playlist_author}</p>
            <p><img class="icon" src="assets/img/like-icon.png" />${playlist.likes}</p>
            </section>
            `;
            playlistCards.appendChild(playlistCard);

            // add listener for modal to each playlist
            playlistCard.addEventListener('click', () => {
                openModal(playlist);
            })
        })
    }
})
.catch(error => {
    console.log('Error encountered: ' + error);
})

// Modal JS
const modal = document.getElementById("playlist-modal");
const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = "none";
    songCards.innerHTML = ''; // clears songs from modal
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    songCards.innerHTML = '';
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
    console.log('opened modal for playlist: ' + playlist.playlist_name);

    modal.style.display = "block";
    playlistCover.src = playlist.playlist_art;
    playlistName.textContent = playlist.playlist_name;
    creatorName.textContent = playlist.playlist_author;

    // songs 
    const songs = playlist.songs;
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