import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { createWriteStream } from 'node:fs';
import { Readable } from "node:stream";
import * as dotenv from 'dotenv';

dotenv.config();

class Storage {
    static instance;
    bucketName = "";
    s3Client;

    constructor() {
        const awsBucketConfig = this._loadEnvBucketConfig();
        this.bucketName = awsBucketConfig[0];
        this.s3Client = new S3Client({
            region: awsBucketConfig[1]
        });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Storage();
        }
        return this.instance;
    }

    _loadEnvBucketConfig() {
        const BUCKET_REGION_ENV_KEY = "AWS_BUCKET_REGION";
        const BUCKETNAME_ENV_KEY = "AWS_BUCKET_NAME";

        const envBucketRegion  = process.env[BUCKET_REGION_ENV_KEY];
        const envBucketName = process.env[BUCKETNAME_ENV_KEY];

        if (!envBucketName || !envBucketRegion) {
            throw new Error("Missing AWS environment variables");
        }

        return [
            envBucketName,
            envBucketRegion
        ]
    }

    async getMermaid(articleId) {
        const params = {
            Bucket: this.bucketName,
            Key: articleId,
        };

        const command = new GetObjectCommand(params);

        const data = await this.s3Client.send(command);
        return new Promise(async (resolve, reject) => {
            const body = data.Body;
            if (body instanceof Readable) {
              const writeStream = createWriteStream(params.Key);
              body
                .pipe(writeStream)
                .on("error", (err) => reject(err))
                .on("close", () => resolve(true));
            } else {
                resolve(false);
            }
        });

    }
}

export default Storage;
