import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; payload: any }> {
    const user = await this.usersService.getUserByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { user_id: user._id, username: user.user_name };
    return {
      payload,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
