const exec = require('child_process').exec;
const fs = require('fs');

const singleFrame = function (fileNameToCreate, videoUrl) {

    return new Promise((resolve, reject) => {

        fs.unlink(fileNameToCreate, (e) => { });

        var ffcmd = 'ffmpeg -i "' + videoUrl + '" -frames:v 1 ' + fileNameToCreate;
        //console.log(`ffcmd(${ffcmd})`);
        exec(ffcmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve('success')
        });
    })
}

const videoRecord = function (fileNameToCreate, videoUrl) {

    return new Promise((resolve, reject) => {

        fs.unlink(fileNameToCreate, (e) => { });

        var ffcmd = 'ffmpeg -i "' + videoUrl + '" -frames:v 320 ' + fileNameToCreate;
        //console.log(`ffcmd(${ffcmd})`);
        exec(ffcmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve('success')
        });
    })
}

exports.singleFrame = singleFrame;
exports.videoRecord = videoRecord;