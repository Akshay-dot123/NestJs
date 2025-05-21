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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const room_entity_1 = require("./entities/room.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let RoomService = class RoomService {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    findAll() {
        return `This action returns all room`;
    }
    findOne(id) {
        return `This action returns a #${id} room`;
    }
    async findRoom(room) {
        return await this.roomRepository.findOne({ where: { room_name: room } });
    }
    async findUserRoom(room_name, userId) {
        return await this.roomRepository.findOne({
            where: {
                room_name,
                user: { id: userId },
            },
            relations: ['user'],
        });
    }
    async findAllRoom(room_name) {
        const rooms = await this.roomRepository.find({
            where: { room_name },
            relations: ['messages', 'messages.user'],
        });
        const allMessages = [];
        for (const room of rooms) {
            if (room.messages && room.messages.length > 0) {
                for (const message of room.messages) {
                    const messageData = {
                        id: message.id,
                        message: message.message,
                        isDeleted: message.isDeleted,
                        createdAt: message.createdAt,
                        updatedAt: message.updatedAt,
                        user: {
                            id: message.user.id,
                            username: message.user.username,
                        },
                        room: {
                            id: room.id,
                            room_name: room.room_name,
                        },
                    };
                    allMessages.push(messageData);
                }
            }
        }
        console.log("allMessages=========>", allMessages);
        return allMessages;
    }
    remove(id) {
        return `This action removes a #${id} room`;
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RoomService);
//# sourceMappingURL=room.service.js.map