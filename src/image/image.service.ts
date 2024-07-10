import { Injectable, Inject } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { S3Client, ListObjectsCommand, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class ImageService {
  constructor(
  @Inject('S3_CLIENT') 
  private readonly s3Client: S3Client,
  @Inject('rabbit@7c830cb07675') 
  private readonly client: ClientProxy  
  )  
  {}

  async create(file: Express.Multer.File) {
      try {
        /** Upload Image To Bucket */
        const params = {
        Bucket: process.env.BUCKET_NAME, // Replace with your S3 bucket name
        Key: `${file.originalname}.${file.originalname.split('.')[1]}`,
        Body: file.buffer,
        ContentType: file.mimetype, // Set the content type according to your file type
        };
  
        await this.s3Client.send(new PutObjectCommand(params))
        const base_url = 'https://mystorybucket.s3.eu-central-1.amazonaws.com'
        // retrieve image_url
        const image_url = `${base_url}/${file.originalname}.${file.originalname.split('.')[1]}`

        this.client.emit('file_uploaded', { image_url , product_id: 'Salt'+Math.random().toString() })

        console.log('File Uploaded Event')

        return  { image_url }
      } catch (error) {
        return error
      }
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
    const response = await this.s3Client.send(new DeleteObjectCommand({ Bucket: process.env.BUCKET_NAME, Key:id }));
    console.log(response)
    
    return 'File deleted';
  }


}
