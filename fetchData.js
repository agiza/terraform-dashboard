const s3 = require('./s3')

module.exports = () => {
  if (process.env.TERRAFORM_BACKEND === 's3') {
    return s3()
  }
}
