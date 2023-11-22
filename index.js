const musicSlider = document.getElementById("musicSlider");
const currentTimeSpan = document.getElementById("currentTime");

function updateCurrentTime() {
  const totalTime = 613;
  const currentTime = (musicSlider.value / 100) * totalTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  currentTimeSpan.textContent = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

musicSlider.addEventListener("input", updateCurrentTime);
updateCurrentTime();

const playPauseBtn = document.getElementById("playPauseBtn");
let isPlaying = false;

playPauseBtn.addEventListener("click", togglePlayPause);

function togglePlayPause() {
  isPlaying = !isPlaying;
  playPauseBtn.classList.toggle("fa-circle-play", !isPlaying);
  playPauseBtn.classList.toggle("fa-pause", isPlaying);
}

function showTab(tabId) {
  const lyricsTab = document.getElementById("lyricsTab");
  const otherAlbumsTab = document.getElementById("otherAlbumsTab");
  const relatedArtistTab = document.getElementById("relatedArtistTab");

  if (lyricsTab) lyricsTab.style.display = "none";
  if (otherAlbumsTab) otherAlbumsTab.style.display = "none";
  if (relatedArtistTab) relatedArtistTab.style.display = "none";

  const selectedTab = document.getElementById(tabId);

  if (selectedTab) {
    selectedTab.style.display = "block";
  } else {
    console.error("Element with ID", tabId, "not found.");
  }

  const lyricsContainer = document.getElementById("lyricsContainer");
  if (tabId !== "lyricsTab" && lyricsContainer) {
    lyricsContainer.style.display = "none";
  } else if (lyricsContainer) {
    lyricsContainer.style.display = "block";
  }
}

const rapidApiKey = "3c1cd34e83mshab587e466a5d3d1p1fbacajsndbc48cc83696";
const geniusApiUrl = "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/";

const currentSongId = "2396871";

fetchLyrics(currentSongId);

async function fetchLyrics(songId) {
  try {
    const response = await axios.get(geniusApiUrl, {
      params: { id: songId },
      headers: {
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
        "X-RapidAPI-Key": rapidApiKey,
      },
    });

    if (response.status === 200) {
      const lyrics = response.data.lyrics;

      if (
        lyrics &&
        lyrics.lyrics &&
        lyrics.lyrics.body &&
        lyrics.lyrics.body.html
      ) {
        const lyricsHtml = lyrics.lyrics.body.html;
        const lyricsContentElement = document.getElementById("lyricsContent");

        if (lyricsContentElement) {
          lyricsContentElement.innerHTML = lyricsHtml || "Lyrics not found";
        } else {
          console.error(
            'Element with id "lyricsContent" not found in the HTML.'
          );
        }
      } else {
        console.error(
          "Lyrics data is incomplete or not found in the response."
        );
      }
    } else {
      console.error("Error fetching lyrics. Status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching lyrics:", error);
  }
}
