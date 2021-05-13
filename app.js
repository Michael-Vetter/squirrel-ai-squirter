const path = require('path');
const fs = require('fs');
const capture = require('./captureImage');
const s3 = require('./s3operations');
const rekog = require('./rekognizeImage');
const dateformat = require('dateformat');

const videoUrl = 'rtsp://192.168.1.222:554/11';
const S3BucketName = 'birdfeederimageanalysis';
const TIME_INTERVAL = 3000;   //300000
var filename = '';

var intervalId = setInterval(function(){ 
	filename = 'images/bf' + dateformat(new Date(), "yyyy-mm-dd-HHMMssl") + '.jpg';

    capture.fromVideoStreamPromise(filename, videoUrl)
        .then((message => {
            //console.log(`then fromVideoStreamPromise: ${message}`);
            s3.uploadFilePromise(S3BucketName,filename)
                .then((message => {
                    //console.log(`then uploadFilePromise: ${message}`);
                    rekog.detectLabelsPromise(S3BucketName, path.basename(filename))
                        .then((message => {
                            //console.log(`then detectLabelsPromise: ${message}`);
                            console.log(filename);
                        }))
                        .catch((error => {
                            console.log(`catch detectLabelsPromise: ${error}`);
                        }));
                }))
                .catch((error => {
                    console.log(`catch uploadFilePromise: ${error}`);
                }));
        }))
        .catch((error) => {
            console.log(`catch fromVideoStreamPromise: ${error}`)
        })
	//capture.fromVideoStream(filename, videoUrl, uploadToS3);
    //console.log(filename);
}, TIME_INTERVAL);