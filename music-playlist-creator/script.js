const modal = document.getElementById("playlist-modal");

const playlistCards = document.querySelectorAll('.playlist');

const span = document.getElementsByClassName('close')[0];

playlistCards.forEach(playlistCard => {
    playlistCard.addEventListener('click', function() {
        modal.style.display = "block";
    });
});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
