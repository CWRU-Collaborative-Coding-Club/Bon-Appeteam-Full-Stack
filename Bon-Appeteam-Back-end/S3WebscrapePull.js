require('dotenv').config({
    path: __dirname + '/.env'
  });

const AWS = require('aws-sdk')
const fs = require("fs");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const REGION = "us-east-1"; // e.g., "us-east-1"
const BUCKET_NAME = 'fribley';
const FILE_KEY = "fribley_04_04_2025.json";


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


let s3 = new AWS.S3({
});


const params = {
    Bucket: BUCKET_NAME,
    Key: FILE_KEY,
};


s3.listBuckets(function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
});


s3.getObject(params, (err, data) => {
    if (err) {
        console.error('Error getting object from S3:', err);
    } else {
        const json = JSON.parse(data.Body.toString('utf-8'));
        console.log('JSON from S3:', json);
        console.log("example item for debug:", json["20079367"]);

    }
});
