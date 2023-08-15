import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule} from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://yoripe:yoripe123@namanpy.fr257.mongodb.net/?retryWrites=true&w=majority'), UserModule, RoomModule, MessageModule, ChatModule],
  controllers: [],
  providers: [AppService, ChatModule],
})
export class AppModule {}
