import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async handleRegister(@Body() registerBody: RegisterAuthDto) {
    try {
      return await this.authService.register(registerBody);
    } catch (error) {
      console.log('Error en Registar usuario', error);
      // Devolver el error como respuesta HTTP
      if (error instanceof HttpException) {
        throw error; // Re-lanzar HttpException para que NestJS lo maneje
      } else {
        throw new HttpException(
          error.message || 'Error al registrar usuario',
          error.status || 500,
        );
      }
    }
  }

  @Post('login')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    //console.log('login', loginBody);
    return this.authService.login(loginBody);
  }
}
