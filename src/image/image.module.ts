import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports:[AwsModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
