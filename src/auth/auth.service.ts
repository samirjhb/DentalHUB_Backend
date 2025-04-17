import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { AuthDocument, Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await this.authModel.findOne({
        email: userObject.email,
      });
      if (existingUser) {
        throw new HttpException('El email ya está registrado', 400);
      }

      const { password } = userObject;
      const plainToHash = await hash(password, 10);
      userObject = { ...userObject, password: plainToHash };
      const newUser = await this.authModel.create(userObject);

      const payload = { id: newUser._id, name: newUser.name };
      const token = this.jwtService.sign(payload);

      const data = { user: newUser, token };

      return data;
    } catch (error) {
      // Manejar errores de MongoDB
      if (error.code === 11000) {
        throw new HttpException('El email ya está registrado', 400);
      }
      throw error; // Re-lanzar otros errores
    }
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;
    const findUser = await this.authModel.findOne({ email });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser._id, name: findUser.name };
    const token = this.jwtService.sign(payload);

    const data = { user: findUser, token };

    return data;
  }
}
