import { ApiProperty } from '@nestjs/swagger'
import {Exclude, Expose} from 'class-transformer'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserGender, UserType, StatusValue } from '../../../common/enum/sql.enum'

/**
 * 用户信息表
 */
@Entity('yh_user_info')
export class UserInfoEntity {
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: string
  
  @Expose()
  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column({ type: 'varchar', length: 200, nullable: false, comment: '用户登录密码' })
  public password: string
  
  @Expose()
  @Exclude({ toPlainOnly: true }) // 输出屏蔽盐
  @Column({ type: 'varchar', length: 200, nullable: false, comment: '盐', select: false })
  public salt: string

  @ApiProperty({ type: String, description: '用户登录账号' })
  @Expose()
  @Column({ type: 'varchar', length: 32, comment: '用户登录账号' })
  public account: string

  @ApiProperty({ type: String, description: '详情' })
  @Expose()
  @Column({ type: 'varchar', default: '', comment: '详情' })
  public detail: string

  @ApiProperty({ type: String, description: '邮箱' })
  @Expose()
  @Column({ type: 'varchar', comment: '邮箱地址', default: '' })
  public email: string

  @ApiProperty({ type: String, description: '所属状态: 1-有效，0-禁用', enum: StatusValue })
  @Expose()
  @Column({ type: 'tinyint', default: StatusValue.NORMAL, comment: '所属状态: 1-有效，0-禁用' })
  public status: StatusValue

  @ApiProperty({ type: String, description: '头像url' })
  @Expose()
  @Column({ type: 'varchar', comment: '头像地址', default: '' })
  public avatar: string

  @ApiProperty({ type: Number, description: '帐号类型：0-超管， 1-普通用户', enum: UserType })
  @Expose()
  @Column({ type: 'tinyint', default: UserType.ORDINARY_USER, comment: '帐号类型：0-超管， 1-普通用户' })
  public type: UserType

  @ApiProperty({ type: Date, description: '创建时间' })
  @CreateDateColumn({ type: 'timestamp', name: 'create_date', comment: '创建时间' })
  createDate: Date

  @ApiProperty({ type: Date, description: '更新时间' })
  @UpdateDateColumn({ type: 'timestamp', name: 'update_date', comment: '更新时间' })
  updateDate: Date
}
