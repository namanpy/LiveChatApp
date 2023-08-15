import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schema/room.schema';

@Injectable()
export class RoomService {

    constructor(@InjectModel('Room') private readonly roomModel : Model<Room>) {}
    
    async createRoom(roomname : string, description: string, owner : string) : Promise<Room> {

        if(! (await this.findByRoomName(roomname)) ) {

            let room =  new this.roomModel({
                roomname    : roomname,
                description : description,
                owner : owner
            });

            await room.save();

            return room;
        } else {
            throw new BadRequestException("Room already exists.");
        }

    }

    async findByRoomName(roomname : string): Promise<Room>  {

        return await this.roomModel.findOne({ roomname : roomname }).exec();
    }

    async findAll(): Promise<Room []>  {

        let rooms = await this.roomModel.find({}).exec();
   
        return rooms;
    }


}
