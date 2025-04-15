// src/task/entities/task.enums.ts

import { registerEnumType } from '@nestjs/graphql';

export enum Task_priority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export enum Task_status {
  To_Do = 'To-Do',
  In_Progress = 'In-Progress',
  Completed = 'Completed',
}

// Register Enums for GraphQL
registerEnumType(Task_priority, {
  name: 'Task_priority',
  description: 'The priority of a task in the system',
});

registerEnumType(Task_status, {
  name: 'Task_status',
  description: 'The status of a task in the system',
});
