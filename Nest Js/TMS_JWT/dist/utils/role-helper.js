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
const project_entity_1 = require("../project/entities/project.entity");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
let RoleService = class RoleService {
    userRepository;
    projectRepository;
    constructor(userRepository, projectRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }
    async validateAssignedUsers(userId, userRole, projectId) {
        let users = [];
        if (userId) {
            const assignedIds = userId
                .split(',')
                .map((id) => id.trim())
                .filter((id) => /^\d+$/.test(id))
                .map((id) => Number(id));
            if (assignedIds.length === 0) {
                throw new common_1.NotFoundException(`Please insert valid existing Numeric UserId's`);
            }
            users = await this.userRepository.find({
                where: { id: (0, typeorm_2.In)(assignedIds) },
            });
            console.log('number of users assigned', users);
            if (users.length === 0) {
                throw new common_1.NotFoundException('No valid People to be assigned found');
            }
            const project = await this.projectRepository.findOne({
                where: { id: projectId },
                relations: ['users'],
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
            const projectUserIds = project.users.map((u) => u.id);
            const nonProjectUsers = users.filter((u) => !projectUserIds.includes(u.id));
            if (nonProjectUsers.length > 0) {
                throw new common_1.ForbiddenException(`Users [${nonProjectUsers.map((u) => u.id).join(', ')}] are not part of the project`);
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
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role-helper.js.map