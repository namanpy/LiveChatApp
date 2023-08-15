import { Model } from 'mongoose';
import { Message } from './schema/message.schema';
export declare class MessageService {
    private readonly messageModel;
    constructor(messageModel: Model<Message>);
    createMessage(body: string, username: string, room: string): Promise<Message>;
    getRoomMessages(roomname: string, upperlimit: number, lowerlimit: number): Promise<Message[]>;
}
