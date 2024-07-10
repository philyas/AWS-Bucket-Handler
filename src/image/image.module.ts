import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { AwsModule } from 'src/aws/aws.module';
import { RabbitMQClientModule } from 'src/rabbitmq/rabbitmq-client.module';

@Module({
  imports:[AwsModule, RabbitMQClientModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
