const AWS = require('aws-sdk')
const s3 = new AWS.S3()

module.exports = () => {
  const Bucket = process.env.S3_BUCKET
  return s3.listObjects({
    Bucket: Bucket,
    Prefix: process.env.S3_PREFIX
  })
    .promise()
    .then(data =>
      data.Contents
        .filter(object =>
          /.tfstate$/.test(object.Key)
        )
        .map(object => object.Key)
    )
    .then(keys =>
      Promise.all(
        keys.map(key =>
          s3.getObject({
            Bucket: Bucket,
            Key: key
          }).promise()
        )
      )
    )
    .then(files =>
      files
        .map(file => file.Body.toString('utf-8'))
        .map(file => JSON.parse(file))
    )
}
