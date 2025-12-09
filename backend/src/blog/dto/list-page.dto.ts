import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListPageDto {
  @ApiProperty({ description: '每页数量', default: 10 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize: number = 10;

  @ApiProperty({ description: '页码', default: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageNum: number = 1;
}