import crypto from 'crypto';
import { extname } from 'path';

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: '2qJ+yBCjlkmUkvo4CF8EHIxbrsCP+ns6aT2MTNtB',
  accessKeyId: 'AKIAJAN6UECCJKYYRXXQ',
  region: 'us-east-2',
});

const s3 = new aws.S3({
  /* ... */
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'elshadday',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
});

module.exports = upload;
