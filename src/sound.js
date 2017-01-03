const audio = new Audio('files/audio.mp3');

export function play() {
    audio.pause();
    audio.play();
}

export default {
    play
};