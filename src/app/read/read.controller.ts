import { Body, Controller, Get, Post, Param, Inject } from '@nestjs/common';
import ReadService from './read.service';
import axios from 'axios';
import { API, PIC } from '../../common/constants/api';
import { IResult } from '../../types/result.interface';

@Controller('read')
export default class ReadController {
  constructor(@Inject(ReadService) private readonly readService: ReadService) {}

  // 根据id获取书籍的信息
  @Get(':id')
  async getBookInfo(@Param('id') id: number): Promise<IResult> {
    if (id) {
      const rid = encodeURIComponent(`${id}`);
      let result;
      const data = await axios.get(`${API}/book/${rid}`);
      const res = data.data;
      res.cover = PIC + res.cover;

      if (res._id) {
        result = {
          code: 200,
          message: 'ok',
          data: res,
        };
      } else {
        result = {
          code: 200,
          message: '传入id出错',
          data: res,
        };
      }
      return result;
    } else {
      return {
        code: 200,
        message: 'id缺失',
        data: [],
      };
    }
  }
}
