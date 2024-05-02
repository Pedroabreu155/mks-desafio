import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(+email);
    if (user?.email !== email) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.email, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
