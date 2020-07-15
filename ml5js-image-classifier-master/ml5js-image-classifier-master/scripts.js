const classifier = ml5.imageClassifier("MobileNet", modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

const image = document.querySelector(".image");
const item = document.getElementById("item");
const confidence = document.getElementById("confidence");
const gallery = document.getElementById("gallery");

async function getResults() {
    const results = await classifier.classify(image);
    gallery.style.display = "block";
    item.innerText = "Item - " + results[0].label;
    confidence.innerText =  "Confidence Level - " + results[0].confidence.toFixed(2) * 100 + "%";
}

function imageUpload(files) {
    image.src = URL.createObjectURL(files[0]);
    setTimeout(getResults, 50);
}