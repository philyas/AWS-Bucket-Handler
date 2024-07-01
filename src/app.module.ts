import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ImageModule, AwsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
