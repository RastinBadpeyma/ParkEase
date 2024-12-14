import { ApiProperty } from '@nestjs/swagger';
import {  IsBoolean, IsString, Matches } from 'class-validator';

export class CreateParkingSpaceDto {
  @ApiProperty({example: 'Dc' , description: 'The location of the parking space'})
   @IsString()
  location: string;

  @ApiProperty({example: '$7' , description: 'priceperhour'})
  @Matches(/^\$(?!0(\.0{1,2})?$)\d+(\.\d{1,2})?$/, { message: 'Price per hour must be greater than 0 and start with $' })  
  pricePerHour: string;
}