import { Model } from 'mongoose';
import { Room } from './schema/room.schema';
export declare class RoomService {
    private readonly roomModel;
    constructor(roomModel: Model<Room>);
    createRoom(roomname: string, description: string, owner: string): Promise<Room>;
    findByRoomName(roomname: string): Promise<Room>;
    findAll(): Promise<Room[]>;
}
