import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Project)
  createProject(
    @Args('createProject') createProjectInput: CreateProjectInput,
    @Context() context: any,
  ) {
    const creatorRole = context.req.user;
    console.log('User Creating the Project:', creatorRole);
    return this.projectService.create(createProjectInput, creatorRole);
  }

  @Query(() => [Project], { name: 'findAllProject' })
  findAll() {
    return this.projectService.findAll();
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => Project, { name: 'findProjectById' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any,
  ) {
    // We can also implement below method and normal jwt.verify(token,secretKey) which is at the end of code but these needs to be applied in every query or else we need to have middleware.
    // try {
    //   const accessToken = context.req.cookies['access_token'];
    //   console.log('Access Token from cookie:', accessToken);
    //   const decoded = this.jwtService.verify(accessToken.access_token );
    //   console.log('Decoded JWT:', decoded);
    //   return this.projectService.findOne(id);
    // } catch (err) {
    //   console.error('Invalid JWT:', err.message);
    //   throw new UnauthorizedException('Invalid or expired token');
    // }
    return this.projectService.findOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Project)
  updateProject(
    @Args('updateProjectInput') project: UpdateProjectInput,
    @Context() context: any,
  ) {
    const userRole = context.req.user;
    console.log('User making update:', userRole);
    return this.projectService.update(project.id, project, userRole);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Project)
  deleteProject(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any,
  ) {
    const userRole = context.req.user.role;
    console.log('User Deleting Project:', userRole);
    return this.projectService.remove(id, userRole);
  }
}

// Jwt normal Method (Not good as we need to implement same for every query)
// @Query(() => Project, { name: 'findProjectById' })
// async findOne(
//   @Args('id', { type: () => Int }) id: number,
//   @Context() context: any,
// ) {
//   console.log(context.req.cookies);
//   const accessToken = context.req.cookies['access_token'];
//   console.log('Access Token from cookie:', accessToken);
//   try {
//     const decoded = jwt.verify(accessToken.access_token, 'Nivalsa');
//     console.log('Decoded JWT:', decoded);
//     console.log(decoded.role)
//     return this.projectService.findOne(id);
//   } catch (err) {
//     console.error('Invalid JWT:', err.message);
//     throw new UnauthorizedException('Invalid or expired token');
//   }
// }
