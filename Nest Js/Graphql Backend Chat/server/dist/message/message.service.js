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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("./entities/message.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const room_entity_1 = require("../room/entities/room.entity");
let MessageService = class MessageService {
    messageRepository;
    roomRepository;
    userRepository;
    constructor(messageRepository, roomRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }
    async create(data) {
        const { username, room_name, message } = data;
        console.log('data ==========>', data);
        const findUser = await this.userRepository.findOne({
            where: { username: username },
        });
        if (!findUser) {
            throw new Error(`User with username '${username}' not found.`);
        }
        const findRoom = await this.roomRepository.findOne({
            where: {
                user: { id: findUser.id },
                room_name: room_name,
            },
            relations: ['user'],
        });
        if (!findRoom) {
            throw new Error(`Room '${room_name}' not found for user '${username}'.`);
        }
        const newMessage = this.messageRepository.create({
            message,
            room: findRoom,
            user: findUser,
        });
        const savedMessage = await this.messageRepository.save(newMessage);
        return savedMessage;
    }
    async findAll(id) {
        return await this.messageRepository.find({
            where: { room: { id: Number(id) } },
            relations: ['user'],
        });
    }
    findOne(id) {
        return this.messageRepository.findOne({
            where: { id: Number(id) },
            relations: ['user', 'room'],
        });
    }
    async update(body) {
        await this.messageRepository.update(body.id, {
            message: body.message,
        });
        return this.messageRepository.findOne({
            where: { id: body.id },
            relations: ['user', 'room'],
        });
    }
    async remove(body) {
        const message = await this.messageRepository.findOne({
            where: { id: Number(body.id) },
            relations: ['user', 'room'],
        });
        if (message) {
            message.isDeleted = true;
            return await this.messageRepository.save(message);
        }
        return null;
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MessageService);
//# sourceMappingURL=message.service.js.map