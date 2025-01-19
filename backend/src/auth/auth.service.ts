import {HttpException, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {}
  /**
   * 创建token
   * @param payload
   */
  generateToken(payload: object): string {
    return this.jwtService.sign(payload);
  }

  /**
   * 验证token
   * @param token
   */
  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}