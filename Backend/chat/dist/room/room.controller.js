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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const room_dto_1 = require("./dto/room.dto");
const auth_guard_1 = require("../auth/auth.guard");
const fetchmessage_dto_1 = require("./dto/fetchmessage.dto");
const message_service_1 = require("../message/message.service");
let RoomController = exports.RoomController = class RoomController {
    constructor(roomService, messageService) {
        this.roomService = roomService;
        this.messageService = messageService;
    }
    async createRoom(request, room) {
        await this.roomService.createRoom(room.roomname, room.description, request.token.username);
        return { message: "success" };
    }
    async getAllRoom(req) {
        let room = await this.roomService.findAll();
        return { message: "success", room };
    }
    async getMessages(fetchDetails) {
        const messages = await this.messageService.getRoomMessages(fetchDetails.roomname, fetchDetails.upperlimit, fetchDetails.lowerlimit);
        return { message: 'succes', messages };
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, room_dto_1.RoomDTO]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Post)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getAllRoom", null);
__decorate([
    (0, common_1.Post)('getMessages'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetchmessage_dto_1.FetchMessageDTO]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getMessages", null);
exports.RoomController = RoomController = __decorate([
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomService, message_service_1.MessageService])
], RoomController);
//# sourceMappingURL=room.controller.js.map