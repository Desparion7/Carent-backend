import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageSchema } from './model/message.model';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
