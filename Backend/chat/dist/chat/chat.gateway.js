"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const message_service_1 = require("../message/message.service");
class ChatRoom {
    constructor() {
        this.users = [];
        this.userToSocket = {};
        this.socketToUser = {};
        this.onlinecount = 0;
    }
    getUsers() {
        return this.users;
    }
    getUserSocket(username) {
        return this.userToSocket[username];
    }
    addUser(socket, username) {
        console.log('addUser ', username);
        if (this.users.includes(username)) {
            console.log(' username ', username, " already there , removing him first.");
            this.removeUserByUsername(username);
        }
        this.users.push(username);
        this.userToSocket[username] = socket;
        this.socketToUser[socket.id] = username;
        this.onlinecount += 1;
        return true;
        return false;
    }
    removeUser(socket) {
        const username = this.socketToUser[socket.id];
        console.log('removeUser ', username);
        if (this.users.includes(username)) {
            this.users = this.users.filter(name => { if (name !== username)
                return name; });
            delete this.userToSocket[username];
            delete this.socketToUser[socket.id];
            this.onlinecount -= 1;
            return true;
        }
        return false;
    }
    removeUserByUsername(username) {
        if (this.users.includes(username)) {
            this.users = this.users.filter(name => { if (name !== username)
                return name; });
            const socket = this.userToSocket[username];
            delete this.socketToUser[socket.id];
            delete this.userToSocket[username];
            this.onlinecount -= 1;
            return true;
        }
        return false;
    }
}
let ChatGateway = exports.ChatGateway = class ChatGateway {
    constructor(messageService) {
        this.messageService = messageService;
        this.roomList = {};
        this.userToRoomMap = {};
    }
    handleJoin(socket, data) {
        console.log("joined with socket id ", socket.id, ' and username ', data.username);
        if (!data.username)
            return;
        if (!data.roomname)
            return;
        const roomname = data.roomname;
        const username = data.username;
        if (!this.roomList[roomname]) {
            this.roomList[roomname] = new ChatRoom();
            this.roomList[roomname].addUser(socket, username);
            this.userToRoomMap[socket.id] = roomname;
            return;
        }
        this.roomList[roomname].addUser(socket, username);
        this.userToRoomMap[socket.id] = roomname;
        return;
    }
    createMessage(socket, data) {
        const roomname = data.roomname;
        const username = data.username;
        const body = data.body;
        console.log('creating msg');
        if (this.roomList[roomname]) {
            console.log("came here ");
            this.messageService.createMessage(body, username, roomname);
            console.log(this.roomList[roomname].getUsers());
            this.roomList[roomname].getUsers().forEach(name => {
                this.roomList[roomname].getUserSocket(name).emit("message", { username: username, body: body, roomname: roomname });
            });
            return;
        }
        return false;
    }
    handleDisconnect(socket) {
        console.log('disconnected');
        console.log(this.userToRoomMap);
        const roomname = this.userToRoomMap[socket.id];
        if (this.roomList[roomname]) {
            this.roomList[roomname].removeUser(socket);
        }
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createmessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "createMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(82, { cors: true }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map