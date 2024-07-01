import { Injectable, Inject } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { S3Client, ListObjectsCommand, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import { Express } from 'express';

@Injectable()
export class ImageService {
  constructor(@Inject('S3_CLIENT') private readonly s3Client: S3Client) {
  }

  async create(file: Express.Multer.File) {
        /** Upload Image To Bucket */
        const params = {
          Bucket: process.env.BUCKET_NAME, // Replace with your S3 bucket name
          Key: `${file.originalname}.${file.originalname.split('.')[1]}`,
          Body: file.buffer,
          ContentType: file.mimetype, // Set the content type according to your file type
        };
    
        await this.s3Client.send(new PutObjectCommand(params))
        const image_url = 'https://mystorybucket.s3.eu-central-1.amazonaws.com'
 
    return  `Upload successful! Image url: ${image_url}/${file.originalname}.${file.originalname.split('.')[1]}`;
  }

  async findAll() {
      const response = await this.s3Client.send(new ListObjectsCommand({ Bucket: process.env.BUCKET_NAME }));
      return response.Contents;
  }

  async findOne(id: string) {
    const response = await this.s3Client.send(new ListObjectsCommand({ Bucket: process.env.BUCKET_NAME, Prefix:String(id) }));
    return response.Contents;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }
  
  async remove(id: string) {
    const response = this.s3Client.send(new DeleteObjectCommand({ Bucket: process.env.BUCKET_NAME, Key:id }));
    console.log(response)
    
    return 'Object deleted';
  }


}
