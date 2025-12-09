import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {

  @ApiProperty({ description: '用户名', example: 'username' })
  @Expose()
  readonly username: string;

  @ApiProperty({ description: '邮箱', example: '123@qq.com' })
  @Expose()
  readonly email: string;
}