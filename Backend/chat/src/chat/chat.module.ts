import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports : [MessageModule],
  controllers: [],
  providers: [ChatGateway],
})
export class ChatModule {}
