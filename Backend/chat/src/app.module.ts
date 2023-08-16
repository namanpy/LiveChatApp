import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule} from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRootAsync( 
  {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>{
        console.log(process.env)
        return ({
          uri: config.get<string>('DATABASE_STRING')
        }) 
      }
  }), UserModule, RoomModule, MessageModule, ChatModule],
  controllers: [],
  providers: [AppService, ChatModule],
})
export class AppModule {}
