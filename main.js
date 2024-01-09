som = ""
statusOne = ""
objects = []
video = ""

function preload() {
    som = loadSound("alarme.mp3")
}

function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}

function modelLoaded() {
    console.log("modelo iniciado")
    statusOne = true
    objectDetector.detector(video, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects = results
}
function draw() {
    image(video, 0, 0, 380, 380);

    if (statusOne != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objetos Detectados";
            document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados: " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i] == "person") {
             som.play()
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status: detectando objetos"
}



