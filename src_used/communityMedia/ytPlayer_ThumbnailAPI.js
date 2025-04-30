const YT_API_KEY = "secret";

const channelId = "UCLkAepWjdylmXSltofFvsYQ";


function onResponse(response) {
    return response.json();
}

function extractUploadsPlaylistId(data) {
    if (!data.items || data.items.length === 0) {
        console.log('Channel not found');
    }
    return data.items[0].contentDetails.relatedPlaylists.uploads;
}

function fetchChannelUploadsPlaylist() {
    fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YT_API_KEY}`
    ).then(onResponse).then(extractUploadsPlaylistId).then(fetchVideoThumbnails);
}

function displayVideoThumbnails(playlistData) {
    const media_list = document.querySelector(".MediaVideo_list");

    for (let i = 0; i < playlistData.items.length; i++) {
        const item = playlistData.items[i];

        const title = item.snippet.title;
        const thumbnails = item.snippet.thumbnails;
        const videoId = item.snippet.resourceId.videoId;

        let thumbnailUrl = (thumbnails.standard && thumbnails.standard.url) || 
                         (thumbnails.high && thumbnails.high.url) || 
                         (thumbnails.medium && thumbnails.medium.url);

        const videoElement = document.createElement("div");
        videoElement.className = "Video_item_container div_as_button";
        videoElement.dataset.videoId = videoId;
        videoElement.addEventListener("click", loadMediaModal);

        const thumbnailContainer = document.createElement("div");
        thumbnailContainer.className = "Video_thumbnail_container";

        const titleElement = document.createElement("div");
        titleElement.className = "Video_title";
        titleElement.textContent = title;

        const thumbnailImg = document.createElement("img");
        thumbnailImg.src = thumbnailUrl;
        thumbnailImg.alt = title;
        thumbnailImg.title = title;
        thumbnailImg.className = "Video_thumbnail_img";

        thumbnailContainer.appendChild(thumbnailImg);
        videoElement.appendChild(thumbnailContainer);
        videoElement.appendChild(titleElement);
        media_list.appendChild(videoElement);
    }
}

function fetchVideoThumbnails(uploadsPlaylistId) {
    const maxResults=8;
    fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YT_API_KEY}`
    ).then(onResponse).then(displayVideoThumbnails);
}

fetchChannelUploadsPlaylist();