const path = require('path');
const fs = require('fs');
const capture = require('./captureImage');
const s3 = require('./s3operations');
const rekog = require('./rekognizeImage');
const socket = require('./socket');
const dateformat = require('dateformat');

const videoUrl = 'rtsp://192.168.1.222:554/11';
const S3BucketName = 'birdfeederimageanalysis';
const TIME_INTERVAL = 300000;   //300000
const LABEL_OF_INTEREST = 'Squirrel';

async function analyzeAndSquirt() {
    var filename = 'images/bf' + dateformat(new Date(), "yyyy-mm-dd-HHMMssl") + '.jpg';

    // take a picture
    await capture.singleFrame(filename, videoUrl);

    //upload the picture to S3
    await s3.uploadFilePromise(S3BucketName,filename);

    //have the picture analyzed by AWS Rekognition
    const labels = await rekog.detectLabelsPromise(S3BucketName, path.basename(filename));

    //Check for squirrels (or whatever)
    const squirrelLabel = labels.filter(labels => labels.Name === LABEL_OF_INTEREST);
    if(Object.keys(squirrelLabel).length > 0) {
        //squirrel found, start video recording (stops after about 12 seconds)
        console.log('start record');
        var videofilename = 'images/bf' + dateformat(new Date(), "yyyy-mm-dd-HHMMssl") + '.mp4';
        capture.videoRecord(videofilename, videoUrl);
        //wait 3 seconds
        console.log('start timer');
        setTimeout(() => {
            //squirt away...
            console.log('do squirt');
            socket.squirtSquirrel();
        }, 3000);
        
    }        

    console.log(filename);
}

var intervalId = setInterval(function(){ 
	
    try {
        analyzeAndSquirt();
    } catch (err) {
        console.log(err);
    }

}, TIME_INTERVAL);
