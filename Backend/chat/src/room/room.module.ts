import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './schema/room.schema';
import { MessageModule } from 'src/message/message.module';

@Module({

  imports : [MongooseModule.forFeature([{ name : "Room", schema : RoomSchema }]), MessageModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {


}
