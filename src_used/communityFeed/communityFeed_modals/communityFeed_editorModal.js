function loadEditorModal() {
    disableHidden(document.getElementById("WriteModal_container"));
    disableScroll();
}

function clearInputEditor() {
    clearInput(document.getElementById("Editor_box"));
    enableEditorSubmitButton();
}

function publishPost() {
    const newText = document.getElementById("Editor_box");
    if (!isInputEmpty(newText)) {
        newPost(newText.value);
        closeEditorModal();
    }
}

function isClickInsideEditorModal(event) {
    if(!isClickInside(event)) return;
    closeEditorModal();
}

function closeEditorModal() {
    enableHidden(document.getElementById("WriteModal_container"));
    enableScroll();
    clearInputEditor();
}

document.querySelector(".Input_bar_text_container").addEventListener("click", loadEditorModal);

document.getElementById("WriteModal_container").addEventListener("click", isClickInsideEditorModal);

document.getElementById("WriteModalFooter_button_submit").addEventListener("click", publishPost);

document.querySelector("#WriteModal_container .CloseButton_container").addEventListener("click", closeEditorModal);