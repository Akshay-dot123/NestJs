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
exports.ProjectResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const project_service_1 = require("./project.service");
const project_entity_1 = require("./entities/project.entity");
const create_project_input_1 = require("./dto/create-project.input");
const update_project_input_1 = require("./dto/update-project.input");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const jwt_1 = require("@nestjs/jwt");
let ProjectResolver = class ProjectResolver {
    projectService;
    jwtService;
    constructor(projectService, jwtService) {
        this.projectService = projectService;
        this.jwtService = jwtService;
    }
    createProject(createProjectInput, context) {
        const creatorRole = context.req.user;
        console.log('User Creating the Project:', creatorRole);
        return this.projectService.create(createProjectInput, creatorRole);
    }
    findAll() {
        return this.projectService.findAll();
    }
    async findOne(id, context) {
        return this.projectService.findOne(id);
    }
    updateProject(project, context) {
        const userRole = context.req.user;
        console.log('User making update:', userRole);
        return this.projectService.update(project.id, project, userRole);
    }
    deleteProject(id, context) {
        const userRole = context.req.user.role;
        console.log('User Deleting Project:', userRole);
        return this.projectService.remove(id, userRole);
    }
};
exports.ProjectResolver = ProjectResolver;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Mutation)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('createProject')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_input_1.CreateProjectInput, Object]),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    (0, graphql_1.Query)(() => [project_entity_1.Project], { name: 'findAllProject' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Query)(() => project_entity_1.Project, { name: 'findProjectById' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Mutation)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('updateProjectInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_project_input_1.UpdateProjectInput, Object]),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "updateProject", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    (0, graphql_1.Mutation)(() => project_entity_1.Project),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "deleteProject", null);
exports.ProjectResolver = ProjectResolver = __decorate([
    (0, graphql_1.Resolver)(() => project_entity_1.Project),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        jwt_1.JwtService])
], ProjectResolver);
//# sourceMappingURL=project.resolver.js.map