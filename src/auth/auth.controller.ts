import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  handleRegister(@Body() registerBody: RegisterAuthDto) {
    try {
      //console.log(registerBody);
      return this.authService.register(registerBody);
    } catch (error) {
      console.log('Error en Registar usuario', error);
    }
  }

  @Post('login')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    //console.log('login', loginBody);
    return this.authService.login(loginBody);
  }
}
