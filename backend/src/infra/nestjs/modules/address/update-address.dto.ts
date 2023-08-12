import { ApiProperty } from '@nestjs/swagger';
import { errorMessages } from '@common/utils/error-messages';
import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class UpdateAddresDto {
  @ApiProperty({
    required: true,
    example: 'Endereço Matriz',
  })
  @IsNotEmpty({ message: errorMessages.nameRequired })
  name: string;

  @ApiProperty({
    required: true,
    minLength: 8,
    description: 'Pode enviar somente números ou formatado',
    example: '11.222-333',
  })
  @MinLength(8, { message: errorMessages.cepMin })
  @IsNotEmpty({ message: errorMessages.cepRequired })
  cep: string;

  @ApiProperty({
    required: true,
    example: 'Rua Um',
  })
  @IsNotEmpty({ message: errorMessages.streetRequired })
  street: string;

  @ApiProperty({
    required: true,
    example: '123',
  })
  @IsNotEmpty({ message: errorMessages.numberRequired })
  number: string;

  @ApiProperty({
    required: true,
    example: 'Centro',
  })
  @IsNotEmpty({ message: errorMessages.neighborhoodRequired })
  neighborhood: string;

  @ApiProperty({
    required: true,
    example: 'Fortaleza',
  })
  @IsNotEmpty({ message: errorMessages.cityRequired })
  city: string;

  @ApiProperty({
    required: true,
    example: 'CE',
  })
  @IsNotEmpty({ message: errorMessages.stateRequired })
  @Length(2, 2, { message: errorMessages.stateLength })
  state: string;
}
