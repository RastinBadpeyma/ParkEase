export class CreateReservationDto {
   userId:number;
   parkingSpaceId: number;
   reservationDate: Date; 
   startTime: string; 
   endTime: string;
}
