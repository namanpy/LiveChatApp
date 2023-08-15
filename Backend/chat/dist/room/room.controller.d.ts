import { RoomService } from './room.service';
import { RoomDTO } from './dto/room.dto';
import { FetchMessageDTO } from './dto/fetchmessage.dto';
import { MessageService } from 'src/message/message.service';
export declare class RoomController {
    private readonly roomService;
    private readonly messageService;
    constructor(roomService: RoomService, messageService: MessageService);
    createRoom(request: any, room: RoomDTO): Promise<{
        message: string;
    }>;
    getAllRoom(req: Request): Promise<{
        message: string;
        room: import("./schema/room.schema").Room[];
    }>;
    getMessages(fetchDetails: FetchMessageDTO): Promise<{
        message: string;
        messages: import("../message/schema/message.schema").Message[];
    }>;
}
