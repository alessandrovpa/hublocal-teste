import { User } from '@modules/user/entities/user.entity';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request as RequestInterface } from 'express';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './services/auth/auth.service';
import { VerifyTokenService } from './services/verifyToken/verify-token.service';
import { LocalAuthGuard } from './strategies/local-auth.guard';

class AuthResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: User;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private verifyTokenService: VerifyTokenService,
  ) {}

  @ApiCreatedResponse({
    description: 'Autenticação feita com sucesso!',
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Email e/ou senha inválido!',
  })
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req: RequestInterface, @Body() authDto: AuthDto) {
    const token = await this.authService.execute(req.user.id);
    return { token, user: req.user };
  }

  @ApiOkResponse({
    status: 200,
    description: 'Token válido',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Token inválido ou expirado',
  })
  @Get()
  async verifyToken(@Query('token') token: string) {
    await this.verifyTokenService.execute(token);
  }
}
