const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require('path');
const fs = require('fs');

const REGION = "us-east-1"; //e.g. "us-east-1"

exports.uploadFilePromise = function (bucketName, filePath) {

    return new Promise((resolve, reject) => {

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
            try {
                data = await s3.send(new PutObjectCommand(uploadParams));
                resolve('success');
            } catch (err) {
                reject(err);
            }
        };

        run();
    })
}