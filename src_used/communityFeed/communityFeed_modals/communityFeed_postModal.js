let currentPost = null;
let currentOriginalLikeButton = null;

function loadPostModal(event) {
    const button = event.currentTarget;

    const currentPost = button.closest(".Post_item_container");
    const textContainer = currentPost.querySelector(".PostItem_text");

    currentOriginalLikeButton = currentPost.querySelector(".LikeButton");

    const profilePic = currentPost.querySelector(".ProfileImage");
    const profileName = currentPost.querySelector(".Profile_nickname");

    const modal = document.querySelector(".ReactModal");
    modal.querySelector(".ProfileImage").src = profilePic.src;
    modal.querySelector(".Profile_nickname").textContent = profileName.textContent;

    if (currentPost.querySelector(".PostItem_media_container")) {
        const contentPhoto = currentPost.querySelector(".Content_photo");
        const modalBody= document.querySelector(".Modal_post_body");
        
        const mediaContainer=document.createElement("div");
        mediaContainer.className="PostItem_media_container";

        const newContentPhoto=document.createElement("img");
        newContentPhoto.className="Content_photo";
        newContentPhoto.src= contentPhoto.src;

        mediaContainer.appendChild(newContentPhoto);
        modalBody.appendChild(mediaContainer);
    }

    if (currentPost.querySelector(".PostItem_text_container")) {
        const mainText = textContainer.childNodes[0].textContent;
        let fullText = undefined;

        if (currentPost.querySelector(".Text_more")) {
            const dots = textContainer.querySelector(".Text_dots");
            const moreText = textContainer.querySelector(".Text_more");

            enableHidden(dots);
            fullText = mainText + moreText.textContent;
        } else {
            fullText = mainText;
        }

        const modalBody= document.querySelector(".Modal_post_body");
        const newText=document.createElement("div");
        newText.className="ModalBody_fullText";
        newText.textContent=fullText;
        modalBody.appendChild(newText);

    }

    const modalLikeButton = modal.querySelector(".LikeButton");
    syncLikeButton(currentOriginalLikeButton, modalLikeButton);

    disableScroll();
    disableHidden(document.getElementById("ReactModal_container"));
}

function syncLikeButton(source, target) {
    if (!source || !target) return;

    target.dataset.liked = source.dataset.liked;
    target.dataset.likes = source.dataset.likes;
    target.querySelector(".LikeButton_icon").src = source.querySelector(".LikeButton_icon").src;
    target.querySelector(".LikeButton_count").textContent =
        source.dataset.likes === "0" ? "" : source.dataset.likes;
}

function handleLike(event) {
    const clickedButton = event.currentTarget;
    const isModalButton = clickedButton.parentNode.classList.contains("Modal_action_container");

    const originalButton = isModalButton ? currentOriginalLikeButton : clickedButton;
    const modalButton = isModalButton ? clickedButton : document.querySelector(".ReactModal .LikeButton");

    if (!originalButton) return;

    const isLiked = originalButton.dataset.liked === 'true';
    const likeIcon = originalButton.querySelector(".LikeButton_icon");
    let likeCount = parseInt(originalButton.dataset.likes);

    if (isLiked) {
        likeCount--;
        likeButtonFalse(likeIcon);
        originalButton.dataset.liked = "false";
    } else {
        likeCount++;
        likeButtonTrue(likeIcon);
        originalButton.dataset.liked = "true";
    }

    originalButton.dataset.likes = likeCount;
    const likeCounterElement = originalButton.querySelector(".LikeButton_count");

    if (likeCount) {
        likeCounterElement.textContent = likeCount;
    } else {
        likeCounterElement.textContent = ""; 
    }

    syncLikeButton(originalButton, modalButton);
}

function publishComment() {
    const commentInput = document.getElementById("comment_text_area");
    if (!isInputEmpty(commentInput)) {
        newComment(commentInput.value);
        clearInputComment();
    }
}

function clearInputComment(){
    clearInput(document.getElementById("comment_text_area"));
    enableCommentButton();
}

function isClickInsidePostModal(event){
    if(!isClickInside(event)) return;
    closePostModal();
    
}

function closePostModal() {
    const modalBody = document.querySelector(".Modal_post_body");

    enableHidden(document.getElementById("ReactModal_container"));
    const dotsElements = document.querySelectorAll(".Text_dots");
    for (let i = 0; i < dotsElements.length; i++) {
        disableHidden(dotsElements[i]);
    }

    enableScroll();
    modalBody.innerHTML = '';
    clearInputComment();

    currentPost = null;
    currentOriginalLikeButton = null;
  
}

const moreButtons = document.querySelectorAll(".Text_more_button");
for (const button of moreButtons) {
    button.addEventListener("click", loadPostModal);
}

const commentButtons = document.querySelectorAll(".Post_item_container .CommentButton");
for (const button of commentButtons) {
    button.addEventListener("click", loadPostModal);
}

const mediaContainers = document.querySelectorAll(".PostItem_media_container");
for (const container of mediaContainers) {
    container.addEventListener("click", loadPostModal);
}

const likeButtons = document.querySelectorAll(".PostItem_button_container .LikeButton");
for (const button of likeButtons) {
    button.addEventListener("click", handleLike);
}

document.querySelector(".ReactModal .LikeButton").addEventListener("click", handleLike);

document.querySelector(".Comment_input_send_button").addEventListener("click",publishComment);

document.querySelector("#ReactModal_container .CloseButton_container").addEventListener("click", closePostModal);

document.getElementById("ReactModal_container").addEventListener("click", isClickInsidePostModal);


