import { ApiProperty } from '@nestjs/swagger';
import { errorMessages } from '@common/utils/error-messages';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    description: 'Deve conter um formato de e-mail válido',
    example: 'john.doe@gmail.com',
  })
  @IsNotEmpty({ message: errorMessages.emailRequired })
  @IsEmail({}, { message: errorMessages.emailFormat })
  email: string;

  @ApiProperty({
    type: String,
    example: 'password123',
  })
  @IsNotEmpty({ message: errorMessages.passwordRequired })
  password: string;
}
