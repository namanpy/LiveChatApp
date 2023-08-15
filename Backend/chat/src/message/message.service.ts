import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';

@Injectable()
export class MessageService {
    

    constructor(@InjectModel('Message') private readonly messageModel : Model<Message>) {}
    
    async createMessage(body : string, username : string, room : string) : Promise<Message> {

        let message =  new this.messageModel({
            body    : body,
            byUser : username,
            room : room
        });

        await message.save();

        return message;

    }
    async getRoomMessages(roomname : string, upperlimit : number, lowerlimit : number) : Promise<Message[]> {

        let messages = this.messageModel.find({ room : roomname }).sort('createdAt').skip(lowerlimit).limit(upperlimit);
        return messages;
    }

}
