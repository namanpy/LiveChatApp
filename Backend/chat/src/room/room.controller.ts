import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDTO } from './dto/room.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FetchMessageDTO } from './dto/fetchmessage.dto';
import { MessageService } from 'src/message/message.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService, private readonly messageService  :  MessageService ) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createRoom( @Req() request : any, @Body() room : RoomDTO ) {

    await this.roomService.createRoom(room.roomname, room.description, request.token.username);

    return { message : "success" }
  }

  @Post('all')
  async getAllRoom(@Req() req : Request ) {

    let room = await this.roomService.findAll();

    return { message : "success", room }
  }

  @Post('getMessages')
  @UseGuards(AuthGuard)
  async getMessages(@Body() fetchDetails : FetchMessageDTO) {

    return await this.messageService.getRoomMessages(fetchDetails.roomname, fetchDetails.upperlimit, fetchDetails.lowerlimit);
    
  }

}
