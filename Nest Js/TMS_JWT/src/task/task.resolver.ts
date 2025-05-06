import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import {
  UpdateTaskInput,
  UpdateTaskMemberInput,
} from './dto/update-task.input';
import { TaskUser } from './entities/task-user.entity';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { TaskResponse } from './entities/task-response.model';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Task)
  // @Mutation(() => TaskResponse)
  async createTask(
    @Args('createTask') createTaskInput: CreateTaskInput,
    @Context() context: any,
  ) {
    const userRole = context.req.user;
    console.log('Creating a task', userRole);
    // return this.taskService.create(createTaskInput, userRole);
    const newTask = await this.taskService.create(createTaskInput, userRole);
    await this.pubSub.publish('taskCreated', { taskCreated: newTask }); // <--- this is new
    console.log("newTask=========>",newTask)
    return newTask;
    // const { savedTask, taskUsers } = await this.taskService.create(
    //   createTaskInput,
    //   userRole,
    // );
    // await this.pubSub.publish('taskCreated', {
    //   taskCreated: { savedTask, taskUsers },
    // });
    // return { savedTask, taskUsers };
  }

  @Query(() => [Task], { name: 'findAllTask' })
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [TaskUser], { name: 'findAllUserTask' })
  findAllUserTask(@Context() context: any) {
    const userRole = context.req.user;
    console.log('Finding All User Task', userRole);
    return this.taskService.findAllUserTask(userRole);
  }

  // @UseGuards(GqlJwtAuthGuard)
  @Query(() => TaskUser, { name: 'findUserTaskById' })
  findUserTaskById(
    @Args('id', { type: () => Int }) id: number,
    // @Context() context: any,
  ) {
    // const userRole = context.req.user;
    // console.log('Find User Task by Id', userRole);
    return this.taskService.findUserTaskById(id);
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
      userRole,
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => TaskUser)
  updateMemberTask(
    @Args('updateMemberTask') updateMemberTaskInput: UpdateTaskMemberInput,
    @Context() context: any,
  ) {
    const userRole = context.req.user;
    console.log('Updating User or Member Task', userRole);
    return this.taskService.updateMember(
      updateMemberTaskInput.id,
      updateMemberTaskInput,
      userRole,
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => TaskUser)
  deleteTaskUser(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any,
  ) {
    const userRole = context.req.user.role;
    console.log('User Deleting Task_User:', userRole);
    return this.taskService.remove(id, userRole);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Task)
  deleteTask(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any,
  ) {
    const userRole = context.req.user.role;
    console.log('User Deleting Task:', userRole);
    return this.taskService.removeTask(id, userRole);
  }

  // @Subscription(() => TaskResponse, {
  @Subscription(() => Task, {
    // resolve: (value) => value,
    name: 'taskCreated',
    filter: (payload, variables) => {
      console.log('opopopopop');
      console.log('Received filter variables:', variables);
      console.log('payload===========>', payload);
      return variables; // dummy return

      // New TaskResponse return 
      // return payload.taskUsersCreated.some((taskUser) => {
      //   return taskUser.user.includes(variables.userId);
      // });
    },
  })
  taskCreated(@Args('userId', { type: () => Int }) userId: number) {
    console.log('New subscription started for userId in Task:', userId);
    return this.pubSub.asyncIterableIterator('taskCreated');
  }
}
