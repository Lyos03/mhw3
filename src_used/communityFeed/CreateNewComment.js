function newComment(commentText) {
    const profileImage = document.querySelector(".PersonalProfile_container").querySelector(".ProfileImage");
    const profileName = document.querySelector(".PersonalProfile_container").querySelector(".Profile_nickname").textContent;

    const newComment_item_container = document.createElement("div");
    newComment_item_container.className = "Comment_item_container";

    const newCommentItem_header_container = document.createElement("div");
    newCommentItem_header_container.className = "CommentItem_header_container";

    const newCommentItemHeader_profileImage_container = document.createElement("a");
    newCommentItemHeader_profileImage_container.className = "CommentItemHeader_profileImage_container";

    const newProfileImage = document.createElement("img");
    newProfileImage.className="ProfileImage";
    newProfileImage.src=profileImage.src;

    newCommentItemHeader_profileImage_container.appendChild(newProfileImage);

    const newCommentItemHeader_profileText_container = document.createElement("div");
    newCommentItemHeader_profileText_container.className = "CommentItemHeader_profileText_container";

    const newProfile_nickname_container = document.createElement("div");
    newProfile_nickname_container.className = "Profile_nickname_container";

    const newProfile_nickname = document.createElement("div");
    newProfile_nickname.className = "Profile_nickname";
    newProfile_nickname.textContent = profileName;

    newProfile_nickname_container.appendChild(newProfile_nickname);
    newCommentItemHeader_profileText_container.appendChild(newProfile_nickname_container);
    newCommentItem_header_container.appendChild(newCommentItemHeader_profileImage_container);
    newCommentItem_header_container.appendChild(newCommentItemHeader_profileText_container);

    const newCommentItem_comment_text = document.createElement("div");
    newCommentItem_comment_text.className = "CommentItem_comment_text";
    newCommentItem_comment_text.textContent = commentText;

    newComment_item_container.appendChild(newCommentItem_header_container);
    newComment_item_container.appendChild(newCommentItem_comment_text);

    document.querySelector(".Comment_list_container").appendChild(newComment_item_container);
}