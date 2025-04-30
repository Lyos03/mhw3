function recordUsername(){
    const newUsername=document.getElementById("join_username_input");
    if(!isInputEmpty(newUsername)){
        const personalUsername=document.querySelector(".PersonalProfile_container .Profile_nickname");
        personalUsername.textContent=newUsername.value;
        closeJoinModal();
    }

}

function clearInputJoin(){
    clearInput(document.getElementById("join_username_input"));
}

function closeJoinModal(){
    enableHidden(document.getElementById("JoinModal_container"));
    enableScroll();
    clearInputJoin();
}


document.getElementById("join_submit_button").addEventListener("click",recordUsername);


