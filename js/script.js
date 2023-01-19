const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");

// Music
const songs = [
  {
    path:
      "media/@amirh_mixer تلگرام Zakhmi remix.mp3",
    displayName: "remix",
    artist: "rap fars",
    cover:
      "https://imgs.search.brave.com/cymj_YGd7gvD5CIl3CIu0ADU-yNCgPkquKLZj3rEYaA/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5q/ZzZCUm9FSWpHV3h4/WVdIb0MzWTJ3SGFI/YSZwaWQ9QXBp",
  },
  {
    path: "media/Ali Sorena - Nafir Remix [320].mp3",
    displayName: "Nafir Remix",
    artist: "rap fars",
    cover: "https://imgs.search.brave.com/w4OF3gFrGa5su52DvgU-LHAwni-fdU3iHCllOEUHAfI/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5l/dEFUb040QzNwUU9r/Mm4tT0RTa0JRSGFI/YSZwaWQ9QXBp",
  },
  {
    path:
      "media/ali sorna remix by dj hamidreza.mp3",
    displayName: "sorna remix",
    artist: "rap fars",
    cover:
      "https://imgs.search.brave.com/Jita2qdXf3QKqwWdHxy1fuF4w2y83xrJLo4PZCpifv8/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5x/YWJsMlg0VjdpSEpG/ME9jaC1WY1l3SGFI/YSZwaWQ9QXBp",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

// Update DOM
function loadSong(song) {
  console.log(song);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
