import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";
import {BlogMenuEntity} from "./blog-menu.entity";

@Entity('yh_blog_item')
export class BlogItemEntity {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: string

  @ApiProperty({ type: String, description: '标题' })
  @Expose()
  @Column({ type: 'varchar', comment: '标题' })
  public title: string

  @ApiProperty({ type: String, description: '内容' })
  @Expose()
  @Column({ type: 'longtext', comment: '内容' })
  public content: string

  @ManyToOne(() => BlogMenuEntity, blog => blog.blogItem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    createForeignKeyConstraints: true
  })
  @Expose()
  public menu: BlogMenuEntity
}
