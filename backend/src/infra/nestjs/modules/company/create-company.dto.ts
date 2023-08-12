import { ApiProperty } from '@nestjs/swagger';
import { errorMessages } from '@common/utils/error-messages';
import { IsNotEmpty, IsUrl, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    required: true,
    example: 'HubLocal',
  })
  @IsNotEmpty({ message: errorMessages.nameRequired })
  name: string;

  @ApiProperty({
    required: true,
    description: 'Deve conter um formato de URL válido (xxx.com)',
    example: 'hublocal.com.br',
  })
  @IsNotEmpty({ message: errorMessages.websiteRequired })
  @IsUrl({}, { message: errorMessages.websiteFormat })
  website: string;

  @ApiProperty({
    required: true,
    minLength: 14,
    description: 'Pode enviar somente números ou formatado',
    example: '11.222.333/0001-44',
  })
  @IsNotEmpty({ message: errorMessages.cnpjRequired })
  @MinLength(14, { message: errorMessages.cnpjMin })
  cnpj: string;
}
