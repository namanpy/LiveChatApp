import { OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';
export declare class ChatGateway implements OnGatewayDisconnect {
    private readonly messageService;
    private roomList;
    private userToRoomMap;
    constructor(messageService: MessageService);
    handleJoin(socket: Socket, data: any): void;
    createMessage(socket: Socket, data: any): boolean;
    handleDisconnect(socket: Socket): void;
}
