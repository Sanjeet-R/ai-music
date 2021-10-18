song1 = "";
song2 = "";
song1status = "";
song2status = "";

function preload() {
    song1 = loadSound("harry potter.mp3");
    song2 = loadSound("avengers.mp3");
}
scoreRightWrist = 0;
scoreLeftWrist = 0;

RightWristX = 0;
RightWristY = 0;

LeftWristX = 0;
LeftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    console.log("test");
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('blue');

    song1status = "song1 isplaying";
    song2status = "song2 isplaying";

    if (scoreRightWrist > 0.2) {
        circle(RightWristX, RightWristY, 20);
        song2.stop();
        document.getElementById("volume").innerHTML = "stopped avengers theme song";
       
            song1.play();
            document.getElementById("speed").innerHTML = "playing harry potter theme song";

        
    }
if (scoreLeftWrist > 0.2) {
    circle(LeftWristX, LeftWristY, 20);
    song1.stop();
    document.getElementById("speed").innerHTML = "stopped harry potter theme song";
    
    
    
   
        song2.play();
        document.getElementById("volume").innerHTML = "playing avengers theme endgame song";

    
}
}