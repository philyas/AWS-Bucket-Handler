import { Injectable, Inject } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { Express } from 'express';

@Injectable()
export class ImageService {
  constructor(@Inject('S3_CLIENT') private readonly s3Client: S3Client) {
  }

  create(file: Express.Multer.File) {
    console.log(file)
    return 'This action adds a new image';
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

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
