import {  IsBoolean, IsString, Matches } from 'class-validator';

export class CreateParkingSpaceDto {
   @IsString()
  location: string;


  @Matches(/^\$(?!0(\.0{1,2})?$)\d+(\.\d{1,2})?$/, { message: 'Price per hour must be greater than 0 and start with $' })  
  pricePerHour: string;
}