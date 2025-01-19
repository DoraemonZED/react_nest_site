import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Matches} from "class-validator";

export class SaveOriginImgDto {
  @ApiProperty({description: '远程文件地址', example: 'YangW'})
  // @Matches(/^$/, {message: '填入正确的链接地址'})
  @IsNotEmpty({ message: '请传入图片地址' })
  url: string
}