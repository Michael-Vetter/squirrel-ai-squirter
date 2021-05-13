const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require('path');
const fs = require('fs');

const REGION = "us-east-1"; //e.g. "us-east-1"

exports.uploadFilePromise = function (bucketName, filePath) {

    return new Promise((resolve, reject) => {

        // Set the parameters
        const uploadParams = { Bucket: bucketName };
        const s3 = new S3Client({ region: REGION });

        var fileStream = fs.createReadStream(filePath);
        fileStream.on('error', function (err) {
            console.log('File Error', err);
        });

        uploadParams.Body = fileStream;
        var path = require('path');
        uploadParams.Key = path.basename(filePath);

        const run = async () => {
            // Add the required 'Key' parameter using the 'path' module.
            //uploadParams.Key = path.basename('./bf1617582399513.jpg');
            //console.log('uploadParams', uploadParams);
            try {
                data = await s3.send(new PutObjectCommand(uploadParams));
                //console.log("Success", data);
                resolve('success');
                //return data;
            } catch (err) {
                reject(err);
            }
        };

        run();
    })
}