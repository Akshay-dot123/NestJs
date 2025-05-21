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
exports.MessageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const message_entity_1 = require("./entities/message.entity");
const message_service_1 = require("./message.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const room_service_1 = require("../room/room.service");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let MessageResolver = class MessageResolver {
    messageService;
    roomService;
    userService;
    pubSub;
    constructor(messageService, roomService, userService, pubSub) {
        this.messageService = messageService;
        this.roomService = roomService;
        this.userService = userService;
        this.pubSub = pubSub;
    }
    async findAllMessages(room_name, username) {
        const roomMessages = await this.roomService.findAllRoom(room_name);
        const user = await this.userService.findOne(username);
        if (!user)
            throw new Error('User not found');
        const userRoom = await this.roomService.findUserRoom(room_name, user.id);
        if (!userRoom)
            throw new Error('User has not joined this room');
        const joinedAt = new Date(userRoom.createdAt).getTime();
        const filteredMessages = roomMessages
            .filter((msg) => new Date(msg.createdAt).getTime() >= joinedAt)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        return filteredMessages;
    }
    async sendMessage(sendMessageInput) {
        const created = await this.messageService.create(sendMessageInput);
        await this.pubSub.publish('messageSent', { messageSent: created });
        return created;
    }
    async updateMessage(updateMessageInput) {
        const updated = await this.messageService.update(updateMessageInput);
        await this.pubSub.publish('messageUpdated', { messageUpdated: updated });
        console.log(updated);
        return updated;
    }
    async deleteMessage(deleteMessageInput) {
        const deletedMessage = await this.messageService.remove(deleteMessageInput);
        await this.pubSub.publish('messageDeleted', { messageDeleted: deletedMessage });
        console.log(deletedMessage);
        return deletedMessage;
    }
    messageSent(room_name) {
        return this.pubSub.asyncIterableIterator('messageSent');
    }
    messageUpdated(room_name) {
        return this.pubSub.asyncIterableIterator('messageUpdated');
    }
    messageDeleted(room_name) {
        return this.pubSub.asyncIterableIterator('messageDeleted');
    }
};
exports.MessageResolver = MessageResolver;
__decorate([
    (0, graphql_1.Query)(() => [message_entity_1.Message]),
    __param(0, (0, graphql_1.Args)('room_name')),
    __param(1, (0, graphql_1.Args)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "findAllMessages", null);
__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Message),
    __param(0, (0, graphql_1.Args)('sendMessageInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.SendMessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "sendMessage", null);
__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Message),
    __param(0, (0, graphql_1.Args)('updateMessageInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.UpdateMessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "updateMessage", null);
__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Message),
    __param(0, (0, graphql_1.Args)('deleteMessageInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.DeleteMessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
__decorate([
    (0, graphql_1.Subscription)(() => message_entity_1.Message, {
        name: 'messageSent',
        filter: (payload, variables) => {
            console.log('Received filter variables:', variables);
            console.log('payload===========>', payload);
            return payload.messageSent.room.room_name === variables.room_name;
        },
    }),
    __param(0, (0, graphql_1.Args)('room_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageResolver.prototype, "messageSent", null);
__decorate([
    (0, graphql_1.Subscription)(() => message_entity_1.Message, {
        name: 'messageUpdated',
        filter: (payload, variables) => {
            console.log('Received filter variables:', variables);
            console.log('payload===========>', payload);
            return payload.messageUpdated.room.room_name === variables.room_name;
        },
    }),
    __param(0, (0, graphql_1.Args)('room_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageResolver.prototype, "messageUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => message_entity_1.Message, {
        name: 'messageDeleted',
        filter: (payload, variables) => {
            console.log('Received filter variables:', variables);
            console.log('payload===========>', payload);
            return payload.messageDeleted.room.room_name === variables.room_name;
        },
    }),
    __param(0, (0, graphql_1.Args)('room_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageResolver.prototype, "messageDeleted", null);
exports.MessageResolver = MessageResolver = __decorate([
    (0, graphql_1.Resolver)(() => message_entity_1.Message),
    __param(3, (0, common_1.Inject)('PUB_SUB')),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        room_service_1.RoomService,
        user_service_1.UserService,
        graphql_subscriptions_1.PubSub])
], MessageResolver);
//# sourceMappingURL=message.resolver.js.map