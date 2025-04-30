const noti = document.querySelector(".header_bar_notifications_menu");

function openNotifications(event){
    event.stopPropagation();

    if(!searchBar.classList.contains("hidden")) closeSearchBar();
    disableHidden(noti);
}

function isClickInsideNoti(event){
    if(isClickInside(event)) return;
    closeNotifications();

}
function closeNotifications(){
    enableHidden(noti);
}

const notiContainer=document.querySelector("#header_bar_notifications_container");
notiContainer.addEventListener("click", openNotifications);

document.addEventListener("click",isClickInsideNoti);
