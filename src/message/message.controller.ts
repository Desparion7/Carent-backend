import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { Response } from 'express';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('/')
  async sendMessage(@Body() body: MessageDto, @Res() res: Response) {
    await this.messageService.sendMsg(body);
    res.status(HttpStatus.OK).json({
      message: `Message send correctly`,
    });
  }
}
