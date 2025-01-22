import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";
import {BlogItemEntity} from "./blog-item.entity";

@Entity('yh_blog_menu')
export class BlogMenuEntity {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: string

  @Column({ type: 'int', comment: '排序'})
  @Expose()
  public sort: string

  @Column({ type: 'varchar', comment: '类名', nullable: true, unique: true})
  @Expose()
  public name: string

  @Column({ type: 'varchar', comment: '分类', nullable: true })
  @Expose()
  public category: string

  @OneToMany(() => BlogItemEntity, item => item.menu)
  public blogItem: BlogItemEntity[]
}