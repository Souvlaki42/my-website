import Typewriter from "./Typewriter.js";
const DEFAULT_TYPEWRITER_CONFIGURATION = {
    loop: true,
    typingSpeed: 50,
    deletingSpeed: 50,
    lastDeleteChar: 0,
};
const typingAudio = new Audio("./../public/typing-loop.wav");
typingAudio.loop = true;
typingAudio.volume = 0.1;
typingAudio.play();
const openLink = (url, target = "") => {
    if (!url)
        return;
    window.open(url, target);
};
document.querySelector("#link-1")?.addEventListener("click", () => openLink("https://twitter.com/souvlaki42"));
document.querySelector("#link-2")?.addEventListener("click", () => openLink("https://github.com/Souvlaki42"));
document.querySelector("#link-3")?.addEventListener("click", () => openLink("mailto:souvlaki420@gmail.com"));
const muteBtn = document.querySelector("#mute-btn");
muteBtn?.addEventListener("click", () => {
    if (typingAudio?.paused)
        typingAudio.play();
    else
        typingAudio.pause();
});
const titleTypewriter = new Typewriter(document.querySelector("#title"), { ...DEFAULT_TYPEWRITER_CONFIGURATION, lastDeleteChar: 1 });
const subtitleTypewriter = new Typewriter(document.querySelector("#subtitle"), { ...DEFAULT_TYPEWRITER_CONFIGURATION, lastDeleteChar: 1 });
const descriptionTypewriter = new Typewriter(document.querySelector("#description"), DEFAULT_TYPEWRITER_CONFIGURATION);
titleTypewriter
    .typeString(" Hallo, my name is ")
    .pauseFor(300)
    .deleteChars(17)
    .pauseFor(200)
    .typeString("ello, my name is ")
    .pauseFor(500)
    .typeString("Souvlaki45!!")
    .pauseFor(150)
    .deleteChars(3)
    .pauseFor(100)
    .typeString("2!!")
    .pauseFor(1000)
    .deleteAll(10)
    .start();
subtitleTypewriter
    .typeString(" I want to say them")
    .pauseFor(300)
    .deleteChars(2)
    .pauseFor(100)
    .typeString("at I am")
    .pauseFor(200)
    .deleteChars(3)
    .pauseFor(100)
    .typeString("'m a")
    .pauseFor(100)
    .typeString(": \n")
    .deleteAll(10)
    .start();
descriptionTypewriter
    .typeString("Student\n")
    .pauseFor(1000)
    .typeString("Gamer\n")
    .pauseFor(1000)
    .typeString("Developer\n")
    .pauseFor(1000)
    .deleteAll(10)
    .start();
