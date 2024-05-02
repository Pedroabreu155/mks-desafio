import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisCache: CacheService,
  ) {}

  async signIn(email: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (user?.email !== email) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.email, username: user.email };

    const token = await this.jwtService.signAsync(payload);

    await this.redisCache.storeData(token);

    return { access_token: token };
  }
}
