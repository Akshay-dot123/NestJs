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
const bcrypt = require("bcrypt");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserInput) {
        if (createUserInput.role === user_entity_1.Role.Admin) {
            const existingAdmin = await this.userRepository.findOne({
                where: { role: user_entity_1.Role.Admin },
            });
            if (existingAdmin) {
                throw new common_1.ConflictException('Only one ADMIN user can exist');
            }
        }
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        const user = this.userRepository.create({
            ...createUserInput,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }
    findAll() {
        return this.userRepository.find({ relations: ['projects'] });
    }
    findOne(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['projects', 'projects.tasks'],
        });
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        return user || null;
    }
    update(id, updateUserInput) {
        return `This action updates a #${id} user`;
    }
    async remove(id, removerRole) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User Id does not exist');
        }
        if (removerRole == 'ADMIN') {
            return this.userRepository.remove(user);
        }
        else {
            throw new common_1.UnauthorizedException('Not authorized to remove the User');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map