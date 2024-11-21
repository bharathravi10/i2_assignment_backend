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
  ): Promise<{ access_token: string; payload: any, success: boolean }> {
    const user = await this.usersService.getUserByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { user_id: user._id, username: user.user_name, email: user.user_email };
    return {
      success: true,
      payload,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async userData (email: string):Promise<{user:any, success: boolean}> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { success: true, user: {user_id: user._id, username: user.user_name, email: user.user_email} };
  }
}
