import {IsNumber, IsOptional, IsString, Min} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: '每页数量', default: 'cc' })
  @IsString()
  name: string;

  @ApiProperty({ description: '标题的分类名', default: 'ccc' })
  @IsString()
  groupName: string;

  @ApiProperty({ description: '在显示是排序', default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  order?: number;
}

export class UpdateCategoryDto {
  @ApiProperty({ description: '每页数量', default: 'cc' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: '标题的分类名', default: 'ccc' })
  @IsString()
  @IsOptional()
  groupName: string;

  @ApiProperty({ description: '在显示是排序', default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  order?: number;
}