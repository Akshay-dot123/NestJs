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
exports.DeleteMessageInput = exports.UpdateMessageInput = exports.SendMessageInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let SendMessageInput = class SendMessageInput {
    room_name;
    message;
    username;
};
exports.SendMessageInput = SendMessageInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SendMessageInput.prototype, "room_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SendMessageInput.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SendMessageInput.prototype, "username", void 0);
exports.SendMessageInput = SendMessageInput = __decorate([
    (0, graphql_1.InputType)()
], SendMessageInput);
let UpdateMessageInput = class UpdateMessageInput {
    id;
    message;
};
exports.UpdateMessageInput = UpdateMessageInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateMessageInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateMessageInput.prototype, "message", void 0);
exports.UpdateMessageInput = UpdateMessageInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateMessageInput);
let DeleteMessageInput = class DeleteMessageInput {
    id;
};
exports.DeleteMessageInput = DeleteMessageInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], DeleteMessageInput.prototype, "id", void 0);
exports.DeleteMessageInput = DeleteMessageInput = __decorate([
    (0, graphql_1.InputType)()
], DeleteMessageInput);
//# sourceMappingURL=create-message.dto.js.map