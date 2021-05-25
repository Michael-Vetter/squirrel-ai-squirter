# squirrel-ai-squirter
Use Amazon Rekognition to detect squirrels in my bird feeder, then squirt them with water

What you will need in order to run this code:

1) An Amazon AWS account (you can use Google Cloud's Vision API, but I do not provide code for that)
2) AWS CLI (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html)
3) Node JS (https://nodejs.org/en/download/)
4) FFmpeg (https://www.ffmpeg.org/download.html)
5) An IP video camera (one that allows you to connect to it over your home network; many brands do not allow this). This is the one I use: https://www.amazon.com/gp/product/B07789DM4R/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1


# instructions
1) Set up your Amazon account (aws.amazon.com)
2) Create a user with programmatic access.  It will need at a minimum, permission to write to S3 and use Rekognition.
3) Install CLI and configure the user created in step 2 as the default user (more details here: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html)
4) Create an S3 bucket
5) In the directory where squirrel-ai-squirter is in cloned, run "npm install" on a command line
6) Modify app.js:
    a) Set the variable S3BucketName to the name of the bucket you created in step 4
    b) Set the variable videoUrl to the URL of your video camera
7) Set up your Arduino circuit (see below)
8) run the program by typing "node app"

Arduino Circuit
(coming soon)

