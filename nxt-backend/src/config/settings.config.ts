export const settingsConfig = {
  jwt: {
    secret: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJB'
  },
  s3Bucket: {
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    privateBucketName: process.env.AWS_PRIVATE_BUCKET_NAME,
    publicBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
    privateEndpoint: process.env.AWS_S3_PRIVATE_ENDPOINT,
    publicEndpoint: process.env.AWS_S3_PUBLIC_ENDPOINT,
    s3ForcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE,
    signatureVersion: process.env.AWS_SIGNATURE_VERSION
  }
}
