import {IsInt, IsNumber, Min} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
  @ApiProperty({ description: 'ID' })
  @Type(() => Number) // 将输入数据自动转换成id
  @IsNumber()
  @Min(1)
  @IsInt({ message: 'ID must be an integer' })
  id: number;
}