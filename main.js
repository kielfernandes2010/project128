
The_Day = "";
Silouhette = "";
right_x = 0;
right_y = 0;
left_x = 0;
left_y = 0;
score_leftWrist = 0;
score_rightWrist = 0;
status_t = "";
status_d = "";

function preload(){
    //loading sound
   try_everything = loadSound('The Day.mp3');
   do_life_big = loadSound('Silouhette.mp3');
}

function setup(){
    // creating canvas and setting its position
    canvas = createCanvas(500 , 400);
    canvas.position(500 , 310);
    // creating live view of the webcam and hiding the video component created by p5
    webcam = createCapture(VIDEO);
    webcam.hide();
    //initializing posenet
    posenet = ml5.poseNet(webcam , modelLoaded);
    posenet.on('pose' , gotPoses);
}

function modelLoaded(){
    // it is important to do any action in this function otherwise posenet will not work as it will not have any parameter
    console.log("PoseNet Initialized!");
}

function gotPoses(results){
    // Checking if 'results' array's length is greater than 0 , then it will console the array and the x and y co-ordinates of both the wrists
    if(results.length > 0){
        console.log(results);
        right_x = results[0].pose.rightWrist.x;
        right_y = results[0].pose.rightWrist.y;
        left_x = results[0].pose.leftWrist.x;
        left_y = results[0].pose.leftWrist.y;
        //console.log("Right_Wrist -> X- " + right_x + " Y- " + right_y + "Left_Wrist -> X- " + left_x + " Y- " + left_y);

        // setting the score of the left wrist by getting values from poseNet.

        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.rightWrist.confidence;
        console.log("Score Right Wrist --> "+ score_rightWrist + " Score Left Wrist ", score_leftWrist);

    }
}

function draw(){
    //placing the webcam on the canvas
    image(webcam , 0 , 0 , 500 , 400);

    status_s = Silouhette.isPlaying();
    status_t = The_Day.isPlaying();
    
    fill('#42f5b9');
    stroke('#42f5b9');

    if(score_leftWrist > 0.02){

        circle(left_x , left_y , 20);

        if(status_d == false){
            The_Day.stop();
            Silouhette.play();
            document.getElementById("song_name").innerHTML = "Playing Silouhette";

        }

    } 

    if(score_rightWrist > 0.02){

        circle(right_x , right_y , 20);

        if(status_t == false){
            Silouhette.stop();
            The_Day.play();
            document.getElementById("song_name").innerHTML = "Playing The Day";

        }

    } 

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}