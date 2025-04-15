import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import {
  UpdateTaskInput,
  UpdateTaskMemberInput,
} from './dto/update-task.input';
import { TaskUser } from './entities/task-user.entity';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Task)
  createTask(
    @Args('createTask') createTaskInput: CreateTaskInput,
    @Context() context: any,
  ) {
    const userRole = context.req.user;
    console.log('Creating a task', userRole);
    return this.taskService.create(createTaskInput, userRole);
  }

  @Query(() => [Task], { name: 'findAllTask' })
  findAll() {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'findTaskById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Task)
  updateTask(
    @Args('updateAdminTlTask') updateTaskInput: UpdateTaskInput,
    @Context() context: any,
  ) {
    const userRole = context.req.user;
    console.log('Updating TL or Member Task', userRole);
    return this.taskService.updateAdminTlTask(
      updateTaskInput.id,
      updateTaskInput,
      userRole
    );
  }

  @Mutation(() => TaskUser)
  updateMemberTask(
    @Args('updateMemberTask') updateMemberTaskInput: UpdateTaskMemberInput,
  ) {
    return this.taskService.updateMember(
      updateMemberTaskInput.id,
      updateMemberTaskInput,
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => TaskUser)
  deleteTaskUser(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any,
  ) {
    const userRole = context.req.user.role;
    console.log('User Deleting Task:', userRole);
    return this.taskService.remove(id, userRole);
  }
}
