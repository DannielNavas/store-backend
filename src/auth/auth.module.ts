import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
