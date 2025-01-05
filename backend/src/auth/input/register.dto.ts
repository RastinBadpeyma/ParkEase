import { ApiProperty } from "@nestjs/swagger";
import { Length,IsEmail } from "class-validator";



export class RegisterDto {
   @ApiProperty({example: 'Test userName' , description: 'The username of the user'})
   @Length(5)
   username:string;
   @ApiProperty({ example: 'Test Password123', description: 'The password of the User' })
   @Length(8)
   password:string;
   @ApiProperty({ example: 'Test retypedPassword123', description: 'The retypedpassword of the User' })
   @Length(8)
   retypedPassword:string;
   @ApiProperty({ example: 'Test firstName ', description: 'The firstname of the User' })
   @Length(2)
   firstName: string;
   @ApiProperty({ example: 'Test lastName', description: 'The lastname of the User' })
   @Length(2)
   lastName: string;
   @ApiProperty({ example: 'TestEmail@gmail.com', description: 'The Email of the User' })
   @IsEmail()
   email: string;
  
}