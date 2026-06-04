const prototype = document.querySelector(".prototype");
const cursor = document.querySelector("#customCursor");
const musicPlayer = document.querySelector("#musicPlayer");
const songAudio = document.querySelector("#songAudio");
const playerMinimize = document.querySelector(".player-minimize");
const playerClose = document.querySelector(".player-close");
const playerPlay = document.querySelector(".player-play");
const playerStop = document.querySelector(".player-stop");
const miniPlayer = document.querySelector(".mini-player");
const miniRestore = document.querySelector(".mini-restore");
const miniPlay = document.querySelector(".mini-play");
const dock = document.querySelector("#dock");
const dockMusicButton = document.querySelector("#dockMusicButton");
const dockCollapseButton = document.querySelector("#dockCollapseButton");
const dockMinimizeButton = document.querySelector("#dockMinimizeButton");
const gearButton = document.querySelector("#gearButton");
const userButton = document.querySelector("#userButton");
const userPopup = document.querySelector("#userPopup");
const userPopupClose = document.querySelector(".user-popup-close");
const friendsButton = document.querySelector("#friendsButton");
const friendsPopup = document.querySelector("#friendsPopup");
const friendsPopupClose = document.querySelector(".friends-popup-close");
const internetButton = document.querySelector("#internetButton");
const applicationsPopup = document.querySelector("#applicationsPopup");
const applicationsPopupClose = document.querySelector(".applications-popup-close");

let cursorVisible = false;
let popupLayer = 4;

function moveCursor(event) {
  if (!cursorVisible) {
    cursorVisible = true;
    cursor.style.opacity = "1";
  }

  cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
}

function hideCursor() {
  cursorVisible = false;
  cursor.style.opacity = "0";
}

function toggleImage(button, activeClass, inactiveSrcName, activeSrcName) {
  const img = button.querySelector("img");
  const isActive = button.classList.toggle(activeClass);
  img.src = isActive ? img.dataset[activeSrcName] : img.dataset[inactiveSrcName];
  return isActive;
}

function setGearAsFolder(isFolder) {
  const img = gearButton.querySelector("img");
  gearButton.classList.toggle("is-folder", isFolder);
  img.src = isFolder ? img.dataset.folderSrc : img.dataset.gearSrc;
  gearButton.setAttribute("aria-label", isFolder ? "Restore dock" : "Settings");
}

function collapseDock() {
  dock.dataset.state = "collapsed";
  setGearAsFolder(true);
}

function expandDock() {
  dock.dataset.state = "expanded";
  setGearAsFolder(false);
}

function playSong() {
  songAudio.play().catch(() => {});
}

function pauseSong() {
  songAudio.pause();
}

function stopSong() {
  pauseSong();
  songAudio.currentTime = 0;
}

function openPopup(popup) {
  popupLayer += 1;
  popup.style.zIndex = popupLayer;
  popup.dataset.state = "open";
}

prototype.addEventListener("pointermove", moveCursor);
prototype.addEventListener("pointerleave", hideCursor);

playerMinimize.addEventListener("click", () => {
  musicPlayer.dataset.state = "minimized";
});

playerClose.addEventListener("click", () => {
  stopSong();
  musicPlayer.dataset.state = "closed";
});

playerPlay.addEventListener("click", playSong);

playerStop.addEventListener("click", stopSong);

miniRestore.addEventListener("click", (event) => {
  event.stopPropagation();
  musicPlayer.dataset.state = "open";
});

miniPlay.addEventListener("click", playSong);

dockMusicButton.addEventListener("click", () => {
  if (musicPlayer.dataset.state === "closed") {
    musicPlayer.dataset.state = "open";
  }
});

userButton.addEventListener("click", () => {
  openPopup(userPopup);
});

userPopupClose.addEventListener("click", () => {
  userPopup.dataset.state = "closed";
});

friendsButton.addEventListener("click", () => {
  openPopup(friendsPopup);
});

friendsPopupClose.addEventListener("click", () => {
  friendsPopup.dataset.state = "closed";
});

internetButton.addEventListener("click", () => {
  openPopup(applicationsPopup);
});

applicationsPopupClose.addEventListener("click", () => {
  applicationsPopup.dataset.state = "closed";
});

if (dockMinimizeButton) {
  dockMinimizeButton.addEventListener("click", () => {
  const minimized = toggleImage(dockMinimizeButton, "is-minimized", "minimizeSrc", "maximizeSrc");
  dockMinimizeButton.setAttribute("aria-label", minimized ? "Toggle maximize" : "Toggle minimize");
  });
}

dockCollapseButton.addEventListener("click", collapseDock);

gearButton.addEventListener("click", () => {
  if (dock.dataset.state === "collapsed") {
    expandDock();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && musicPlayer.dataset.state === "closed") {
    musicPlayer.dataset.state = "open";
  }
});
