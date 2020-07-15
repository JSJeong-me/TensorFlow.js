let classifier;
const options = { probabilityThreshold: 0.7 };
let label;
let confidence;

let audio = document.getElementById("audio");
let bubbleSound = document.getElementById("bubbleSound");
let word = document.getElementById("word");
let wordConfidence = document.getElementById("wordConfidence");

function getRandomPosition() {
    const height = document.documentElement.clientHeight - 100;
    const width = document.documentElement.clientWidth - 100;
    let randomHeight = Math.floor(Math.random()*height);
    let randomWidth = Math.floor(Math.random()*width);
    return [randomHeight,randomWidth];
}

function preload() {
    classifier = ml5.soundClassifier('SpeechCommands18w', options);
}

function setup() {
    noCanvas();
    classifier.classify(gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    let myResults = results[0].label;
    word.innerText = "Word - " + results[0].label;
    wordConfidence.innerText = 'Confidence - ' + nf(results[0].confidence, 0, 2);

    if (myResults === "go"){
        bubbleSound.play();
        let bubble = document.createElement('div');
        bubble.setAttribute('class', 'bubble');
        let randomBubbles = getRandomPosition(bubble);
        bubble.style.top = randomBubbles[0] + 'px';
        bubble.style.left = randomBubbles[1] + 'px';
        document.body.appendChild(bubble);

    }
    if (myResults === "stop"){
        let bubble = document.querySelectorAll(".bubble");
        let lastBubble = bubble[ bubble.length-1 ];
        if (bubble.length> 0) {
            audio.play();
            lastBubble.parentNode.removeChild(lastBubble);
        }
    }
}
