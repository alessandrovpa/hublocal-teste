import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { errorMessages } from 'src/utils/error-messages';

export class CreateUserDto {
  @ApiProperty({
    description: 'Deve conter um formato de e-mail válido',
    example: 'john.doe@gmail.com',
  })
  @IsEmail({}, { message: errorMessages.emailFormat })
  @IsNotEmpty({ message: errorMessages.emailRequired })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: errorMessages.nameFormat })
  @IsNotEmpty({ message: errorMessages.nameRequired })
  name: string;

  @ApiProperty({ example: 'password123' })
  @IsString({ message: errorMessages.passwordFormat })
  @IsNotEmpty({ message: errorMessages.passwordRequired })
  password: string;
}
