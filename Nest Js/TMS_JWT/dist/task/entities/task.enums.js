"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task_status = exports.Task_priority = void 0;
const graphql_1 = require("@nestjs/graphql");
var Task_priority;
(function (Task_priority) {
    Task_priority["Low"] = "LOW";
    Task_priority["Medium"] = "MEDIUM";
    Task_priority["High"] = "HIGH";
})(Task_priority || (exports.Task_priority = Task_priority = {}));
var Task_status;
(function (Task_status) {
    Task_status["To_Do"] = "To-Do";
    Task_status["In_Progress"] = "In-Progress";
    Task_status["Completed"] = "Completed";
})(Task_status || (exports.Task_status = Task_status = {}));
(0, graphql_1.registerEnumType)(Task_priority, {
    name: 'Task_priority',
    description: 'The priority of a task in the system',
});
(0, graphql_1.registerEnumType)(Task_status, {
    name: 'Task_status',
    description: 'The status of a task in the system',
});
//# sourceMappingURL=task.enums.js.map