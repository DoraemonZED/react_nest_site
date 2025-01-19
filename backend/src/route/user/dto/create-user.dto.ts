import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({description: '用户名', example: 'YangW'})
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly account: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: 'password 类型错误，正确类型 string' })
  password: string
  
  @ApiProperty({ description: '确认密码', example: '123456' })
  @IsString({ message: ' confirmPassword 类型错误，正确类型 string' })
  readonly confirmPassword: string

  @ApiProperty({ description: '详情描述', example: '', required: false })
  @IsString({ message: '详情描述 类型错误，正确类型 string' })
  @IsOptional()
  readonly detail?: string

  @ApiProperty({ description: '邮箱', example: '2433@qq.com', required: false })
  @IsString({ message: 'email 类型错误，正确类型 string' })
  @IsOptional()
  readonly email?: string


  @ApiProperty({ description: '头像（base64值，最大1mb）', required: false })
  @IsString({ message: 'avatar 类型错误，正确类型 string' })
  @IsOptional()
  readonly avatar?: string
}
