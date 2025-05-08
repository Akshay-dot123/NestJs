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
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import * as cookie from 'cookie';
import * as Jwt from 'jsonwebtoken';
@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
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
    // return this.taskService.create(createTaskInput, userRole);
    const newTask = await this.taskService.create(createTaskInput, userRole);
    await this.pubSub.publish('taskCreated', { taskCreated: newTask }); // <--- this is new
    // console.log('newTask=========>', newTask);
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
  async updateMemberTask(
    @Args('updateMemberTask') updateMemberTaskInput: UpdateTaskMemberInput,
    @Context() context: any,
  ) {
    const userRole = context.req.user;
    console.log('Updating User or Member Task', userRole);
    // return this.taskService.updateMember(
    //   updateMemberTaskInput.id,
    //   updateMemberTaskInput,
    //   userRole,
    // );
    const updatedTask = await this.taskService.updateMember(
      updateMemberTaskInput.id,
      updateMemberTaskInput,
      userRole,
    );
    await this.pubSub.publish('taskUpdated', { taskUpdated: updatedTask });
    console.log('Updated Stattus', updatedTask);
    return updatedTask;
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

  @Subscription(() => Task, {
    // resolve: (value) => value,
    name: 'taskCreated',
    filter: (payload, variables) => {
      console.log('Received filter variables in Task:', variables);
      console.log('payload===========>', payload);
      const users = payload.taskCreated.taskUsers.map(
        (taskUser) => taskUser.user,
      );
      console.log('Extracted users:', users);
      return users.some((user) => user.id === variables.userId);
    },
  })
  taskCreated(@Args('userId', { type: () => Int }) userId: number) {
    console.log('New subscription started for userId in Task:', userId);
    return this.pubSub.asyncIterableIterator('taskCreated');
  }

  @Subscription(() => TaskUser, {
    name: 'taskUpdated',
    filter: (payload, variables, context) => {

      // const user = context.req.extra;
      // const cookieHeader =
      //   user.request.headers?.cookie || context.connectionParams?.cookie;
      // const cookies = cookie.parse(cookieHeader);
      // const rawToken = cookies.token;
      // if (!rawToken) {
      //   throw new Error('hi');
      // }
      // const jsonToken = JSON.parse(rawToken.slice(2)); // remove 'j:' prefix
      // const accessToken = jsonToken.access_token;
      // const decoded = Jwt.verify(accessToken, 'Nivalsa'); // Handle try/catch here
      // console.log('Decoded token:', decoded['role']);
      // console.log(payload.taskUpdated.user.role)
      // const role = decoded['role'];
      // if (role === 'ADMIN') {
      //   return payload.taskUpdated.user.role === 'ADMIN';
      // }
      // return false;

      // console.log('Received filter variables in Task:', variables);
      console.log('payload===========>', payload);
      console.log(payload.taskUpdated.user.id === variables.userId);
      return payload.taskUpdated.user.id === variables.userId;
      // return true;
    },
  })
  taskUpdated(@Args('userId', { type: () => Int }) userId: number) {
    console.log('New subscription started for userId in update Task:', userId);
    return this.pubSub.asyncIterableIterator('taskUpdated');
  }

  // New dummy code, please dont delete this as it might require in future :-
  // private async filterTaskUpdate(
  //   payload: any,
  //   variables: any,
  //   context: any,
  // ): Promise<boolean> {
  //   const user = context.req.extra;
  //   const cookieHeader =
  //     user.request.headers?.cookie || context.connectionParams?.cookie;
  //   const cookies = cookie.parse(cookieHeader);
  //   const rawToken = cookies.token;
  //   if (!rawToken) {
  //     throw new Error('No token found');
  //   }
  //   const jsonToken = JSON.parse(rawToken.slice(2));
  //   const accessToken = jsonToken.access_token;

  //   let decoded;
  //   try {
  //     decoded = Jwt.verify(accessToken, 'Nivalsa');
  //   } catch (err) {
  //     console.error('JWT verification error:', err);
  //     return false;
  //   }
  //   console.log("Data of=======>",payload.taskUpdated.user.role)
  //   const dbUser = await this.userService.findOne(decoded.id);
  //   console.log('Fetched user from DB:', dbUser?.role);
  //   if(payload.taskUpdated.user.role=='MEMBER'){

  //   }
  //   return true;
  // }
  // @Subscription(() => TaskUser, {
  //   name: 'taskUpdated',
  //   filter: function (this: TaskResolver, payload, variables, context) {
  //     console.log("asd")
  //     return this.filterTaskUpdate(payload, variables, context);
  //   },
  // })
  // taskUpdated(@Args('userId', { type: () => Int }) userId: number) {
  //   console.log('New subscription started for userId in update Task:', userId);
  //   return this.pubSub.asyncIterableIterator('taskUpdated');
  // }
}
