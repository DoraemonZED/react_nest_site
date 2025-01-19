import {HttpException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserInfoEntity } from './entities/user.entity';
import { ResultData } from 'src/common/utils/result';
import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcryptjs';
import { plainToInstance, serialize } from 'class-transformer';
import { InjectRedis } from "@nestjs-modules/ioredis";
import { Redis } from "ioredis";


@Injectable()
export class UserService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(UserInfoEntity) private readonly userInfo: Repository<UserInfoEntity>,
  ) {}
  
  /**
   * @description 创建用户
   */
  async create(createUserDto: CreateUserDto): Promise<ResultData> {
    if (await this.findOneByAccount(createUserDto.account)) {
      throw new HttpException('用户名已存在', 400)
    }
    // 密码加密
    const salt = await genSalt()
    createUserDto.password = await hash(createUserDto.password, salt)
    // 存数据库
    const user = plainToInstance(
      UserInfoEntity,
      { salt, ...createUserDto },
      { ignoreDecorators: true, exposeDefaultValues: true, excludeExtraneousValues: true }
    )
    const result = await this.entityManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.save(user)
    })
    return ResultData.ok(result);
  }

  async findOneByAccount(account: string): Promise<UserInfoEntity> {
    return await this.userInfo.findOne({ where: { account } })
  }
}
