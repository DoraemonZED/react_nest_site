import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({description: '用户名', example: 'YangW'})
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: 'password 类型错误，正确类型 string' })
  password: string

  @ApiProperty({ description: '邮箱', example: '2433@qq.com', required: false })
  @IsString({ message: 'email 类型错误，正确类型 string' })
  @IsOptional() // 可选的
  readonly email?: string
}
