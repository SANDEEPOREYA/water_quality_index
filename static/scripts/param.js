document.getElementById("submit").addEventListener("submit", (event) => {
    event.preventDefault();
});

document.querySelectorAll("input").addEventListener("keypress", (event) => {
    return event.keyCode != 13;
});