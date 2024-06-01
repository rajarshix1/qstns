const {Upload} = require("@aws-sdk/lib-storage");
const {S3,} = require("@aws-sdk/client-s3");
  
const awsUpload = async(file) => {
console.log("upload", file);
const s3 = new S3({
    credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_REGION,
});

const params = {
    Bucket: process.env.S3_BUCKETS_NAME,
    Key: Date.now()+"_"+file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
};

try {
    const data = await new Upload({
    client: s3,
    params,
    }).done();
    console.log(`File uploaded successfully. URL: ${data.Location}`);
    return data.Location;
} catch (error) {
    console.log(`Error uploading file to S3: ${error.message}`);
    throw error;
}
}
  module.exports = awsUpload
  