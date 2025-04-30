function enableScroll(){
    document.body.classList.remove("no-scroll");
}

function disableScroll(){
    document.body.classList.add("no-scroll");
}

function clearInput(input){
    input.value = "";
}

function isInputEmpty(textInput) {
    return textInput.value.trim() === "";
}

function enableHidden(input){
    input.classList.add("hidden");
}

function disableHidden(input){
    input.classList.remove("hidden");
}

function isClickInside(event) {
    return event.target === event.currentTarget;
}

function isExpanded(item) {
    return item.dataset.expanded === "true";
}