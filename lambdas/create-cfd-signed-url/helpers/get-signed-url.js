const processRes = require('./process-response.js')
const processErr = require('./process-error.js')

module.exports = (AWS, baseResponse) => {
  const keypairId = process.env.CFD_KEY_PAIR_ID
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
${process.env.CFD_PRIVATE_KEY.split(' ').join('\n')}
-----END RSA PRIVATE KEY-----`
  const cloudFrontSigner = new AWS.CloudFront.Signer(keypairId, privateKey)
  const policy = {
    Statement: [
      {
        Resource: 'https://*',
        Condition: {
          DateLessThan: { 'AWS:EpochTime': (new Date()).getTime() + (24 * 60 * 60 * 1000) }
        }
      }
    ]
  }
  const options = {
    url: 'https://*.*',
    policy: JSON.stringify(policy)
  }
  try {
    return processRes(baseResponse)(cloudFrontSigner.getSignedUrl(options))
  } catch (err) {
    return processErr(baseResponse)(err)
  }
}
