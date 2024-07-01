import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: () => {
        return new S3Client({
          region: process.env.REGION,
          credentials: {
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
          },
        });
      },
    },
  ],
  imports:[
    ConfigModule.forRoot()
  ],
  exports: ['S3_CLIENT'],
})
export class AwsModule {}
