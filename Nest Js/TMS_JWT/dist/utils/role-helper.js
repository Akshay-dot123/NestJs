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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
let RoleService = class RoleService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateAssignedUsers(userId, userRole) {
        let users = [];
        if (userId) {
            const assignedIds = userId
                .split(',')
                .map((id) => parseInt(id.trim(), 10));
            users = await this.userRepository.find({
                where: { id: (0, typeorm_2.In)(assignedIds) },
            });
            if (users.length === 0) {
                throw new common_1.NotFoundException('No valid People to be assigned found');
            }
            if (userRole.role === 'TEAM_LEAD') {
                const isAssigningToAdmin = users.some((assignedUser) => assignedUser.role === 'ADMIN');
                if (isAssigningToAdmin) {
                    throw new common_1.ForbiddenException('TL cannot assign tasks to an Admin, please check userId');
                }
            }
        }
        return users;
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role-helper.js.map