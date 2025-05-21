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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const room_entity_1 = require("../room/entities/room.entity");
let UserService = class UserService {
    userRepository;
    roomRepository;
    constructor(userRepository, roomRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }
    async create(data) {
        const { username, password, room } = data;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            if (user.password !== password) {
                return false;
            }
        }
        else {
            const newUser = this.userRepository.create({ username, password });
            user = await this.userRepository.save(newUser);
        }
        const existingRoomUser = await this.roomRepository.findOne({
            where: {
                room_name: room,
                user: { id: user.id },
            },
            relations: ['user'],
        });
        if (existingRoomUser) {
            return existingRoomUser;
        }
        const newRoomUser = this.roomRepository.create({
            room_name: room,
            user: user,
        });
        return await this.roomRepository.save(newRoomUser);
    }
    findAll() {
        return `This action returns all user`;
    }
    async findOne(username) {
        return await this.userRepository.findOne({ where: { username } });
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map