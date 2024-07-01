import { PipeTransform, Injectable, BadRequestException , ArgumentMetadata} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const file = value?.file;
    console.log(file)
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validate file type (e.g., JPEG, PNG)
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only JPEG and PNG are allowed.');
    }

    // Validate file size (e.g., max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      throw new BadRequestException('File size exceeds the maximum limit of 5MB.');
    }

    return value;
  }
}
