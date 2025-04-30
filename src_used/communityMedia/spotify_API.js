const SPOTIFY_CLIENT_ID = "secret";
const SPOTIFY_CLIENT_SECRET = "secret";

const ARTIST_NAME = "BTS";
const MEDIA_AUDIO_LIST = document.querySelector(".MediaAudio_list");

let spotifyAccessToken = undefined;

function onTokenResponse(response) {
    return response.json();
}

function onTokenJson(json) {
    spotifyAccessToken = json.access_token;
    getArtistId();
}

function getSpotifyToken() {
    fetch('https://accounts.spotify.com/api/token',
        {
            method: 'post',
            body: 'grant_type=client_credentials',
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
            }
        }
    ).then(onTokenResponse).then(onTokenJson)
}

function onResponse(response) {
    return response.json();
}

function onArtistJson(data) {
    fetchAlbums(data.artists.items[0].id);
}

function getArtistId() {
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(ARTIST_NAME)}&type=artist&limit=1`,
        {
            headers:
            {
                "Authorization": "Bearer " + spotifyAccessToken
            }
        }
    ).then(onResponse).then(onArtistJson)

}

function onAlbumJson(data) {
    for (const album of data.items) {
        fetch(
            `https://api.spotify.com/v1/albums/${album.id}`,
            {
                headers: 
                {
                    "Authorization": "Bearer " + spotifyAccessToken
                }
            }
        )
        .then(onResponse)
        .then(function(albumInfo) {
            createAlbumElement(album, albumInfo);
        }); 
    }
}

function fetchAlbums(artistID) {
    const limit=6
    fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums` +
        `?limit=${limit}` +
        `&include_groups=album,single` +
        `&market=US` +
        `&offset=0`,
        {
            headers:
            {
                "Authorization": "Bearer " + spotifyAccessToken
            }
        }
    ).then(onResponse).then(onAlbumJson);
}



function createAlbumElement(album, albumInfo) {
    const newMedia_album_container = document.createElement("div");
    newMedia_album_container.className = "Media_album_container";
    newMedia_album_container.setAttribute("data-expanded", "false");
    newMedia_album_container.addEventListener("click", showMusicInfo);

    const albumElement = document.createElement("div");
    albumElement.className = "Media_album";

    const coverImg = document.createElement("img");
    coverImg.className = "Media_album_cover";
  
    let url640, url300;
    for (const img of album.images) {
        if (!url640 && img.height === 640) url640 = img.url;
        if (!url300 && img.height === 300) url300 = img.url;
        if (url640 && url300) break;
    }
    
    coverImg.src = url640 || url300 || album.images[0].url;
    
    const infoDiv = document.createElement("div");
    infoDiv.className = "Media_album_info";
    infoDiv.classList.add("hidden");

    const titleElement = document.createElement("div");
    titleElement.className = "Media_album_title";
    titleElement.textContent = album.name;

    const artistElement = document.createElement("span");
    artistElement.className = "Media_album_artist";
    artistElement.textContent = album.artists[0].name;

    const releaseDateElement = document.createElement("span");
    releaseDateElement.className = "Media_album_release_date";
    releaseDateElement.textContent = "Release: " + album.release_date;

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "Media_album_details";

    const trackCountElement = document.createElement("span");
    trackCountElement.className = "Media_album_track_count";
    trackCountElement.textContent = "Tracks: " + albumInfo.tracks.items.length;
    detailsDiv.appendChild(trackCountElement);

    const durationElement = document.createElement("span");
    durationElement.className = "Media_album_duration";

    const totalMs = calculateTotalAlbumDuration(albumInfo.tracks.items);
    const formattedDuration = formatDuration(totalMs);
    durationElement.textContent = "Duration: " + formattedDuration;
    detailsDiv.appendChild(durationElement);

    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(artistElement);
    infoDiv.appendChild(releaseDateElement);
    infoDiv.appendChild(detailsDiv);

    albumElement.appendChild(coverImg);
    albumElement.appendChild(infoDiv);

    newMedia_album_container.appendChild(albumElement);
    MEDIA_AUDIO_LIST.appendChild(newMedia_album_container);
    
}

function calculateTotalAlbumDuration(tracks) {
    let totalMs = 0;
    
    for (const track of tracks) {
        totalMs += track.duration_ms;
    }
    
    return totalMs;
}

function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const paddedSeconds = (seconds < 10) ? "0" + seconds : "" + seconds;

    return minutes + ":" + paddedSeconds;
}

getSpotifyToken();
