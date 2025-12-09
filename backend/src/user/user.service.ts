import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { genSalt, hash } from 'bcryptjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  /**
   * 创建用户
   * @param createUserDto
   */
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    if (await this.findByUsername(createUserDto.username)) {
      throw new HttpException('用户名已存在', 400)
    }
    // 密码加密
    const salt = await genSalt()
    createUserDto.password = await hash(createUserDto.password, salt)
    const result = await this.prisma.userInfo.create({
      data: { ...createUserDto }
    });
    return plainToInstance(CreateUserDto, result, {excludePrefixes: ['password']});
  }

  /**
   * 根据用户名查找用户
   * @param username
   */
  async findByUsername(username: string) {
    const user = await this.prisma.userInfo.findUnique({
      where: { username },
      select: { username: true, password: true }, // 只选择需要的字段
    });
    if (!user) {
      return null;
    }
    return user;
  }

  /**
   * 查找所有用户
   */
  async findAllUser() {
    return this.prisma.userInfo.findMany({ select: { email: true, username: true } });
  }
}
