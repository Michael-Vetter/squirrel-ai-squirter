const exec = require('child_process').exec;
const fs = require('fs');

exports.fromVideoStreamPromise = function (fileNameToCreate, videoUrl) {

    return new Promise((resolve, reject) => {

        fs.unlink(fileNameToCreate, (e) => { });

        var ffcmd = 'ffmpeg -i "' + videoUrl + '" -frames:v 1 ' + fileNameToCreate;

        exec(ffcmd, (err, stdout, stderr) => {
            if (err) {
                //console.error(`exec error: ${err}`);
                reject(err);
                //return;
            }
            resolve('success')
            //console.log(`done: ${stdout}`);
            //callback(fileNameToCreate);
        });
    })
}