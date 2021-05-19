const { RekognitionClient, DetectLabelsCommand } = require("@aws-sdk/client-rekognition");
const fs = require('fs')
const outfileName = 'RekRecord.csv';

exports.detectLabelsPromise = function (bucketName, fileName) {
    return new Promise((resolve, reject) => {

        const client = new RekognitionClient({
            region: "us-east-1"
        });

        const params = {
            Image: {
                S3Object: {
                    Bucket: bucketName,
                    Name: fileName
                }
            }
        };

        const command = new DetectLabelsCommand(params);

        const run = async () => {
            try {
                const data = await client.send(command);
                
                var outFileContents = '';
                for (var item in data.Labels) {
                    
                    outFileContents += `${fileName},${data.Labels[item].Name},${data.Labels[item].Confidence}\r\n`;
                };
                try {
                    const data = fs.writeFileSync(outfileName, outFileContents, { flag: 'a+' })
                    
                } catch (err) {
                    reject(err);
                }
                resolve(data.Labels);
            } catch (err) {
                reject(err);
            }
        };
        run();
    })
}