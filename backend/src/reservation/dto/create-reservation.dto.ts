import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationDto {
   @ApiProperty({ example: 1, description: 'The ID of the user' })
   userId:number;
   @ApiProperty({ example: 2, description: 'The ID of the parking space' })
   parkingSpaceId: number;
   @ApiProperty({ example: '2023-12-25', description: 'The Date of the reservation' })
   reservationDate: Date; 
   @ApiProperty({ example: '2023-12-25T10:00:00Z', description: 'The start time of the reservation' })   
   startTime: string; 
   @ApiProperty({ example: '2023-12-25T12:00:00Z', description: 'The end time of the reservation' })
   endTime: string;
}
