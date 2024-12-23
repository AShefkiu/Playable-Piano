const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [];
let pressedKeys = {}; // to keep track of keys currently being pressed

const playTune = (key) => {
    const audio = new Audio(`tunes/${key}.wav`); // create a new audio instance for each key
    audio.volume = volumeSlider.value; // set the volume for the new audio instance
    audio.play(); 

    const clickedKey = document.querySelector(`[data-key=${key}]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}

// Loop through each key element and add event listeners
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

// Update volume for all sounds
const handleVolume = (e) => {
    volumeSlider.value = e.target.value; // update the slider's volume
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

// Play chords by allowing multiple simultaneous key presses
const pressedKey = (e) => {
    if (allKeys.includes(e.key) && !pressedKeys[e.key]) { // play only if key isn't already pressed
        playTune(e.key);
        pressedKeys[e.key] = true; // mark the key as pressed
    }
}

// Clear key state when the key is released
const releasedKey = (e) => {
    if (pressedKeys[e.key]) {
        pressedKeys[e.key] = false; // mark the key as released
    }
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
document.addEventListener("keyup", releasedKey);
