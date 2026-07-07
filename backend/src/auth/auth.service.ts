import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<{ accessToken: string; email: string }> {
    const user = await this.userModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email });
    return { accessToken, email: user.email };
  }
}
