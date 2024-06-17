import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {JwtStrategy} from "../auth/jwt.strategy";
import {UsersInfModule} from "../users-inf/users-inf.module";
import {UserInf} from "../users-inf/users-inf.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles, UserInf]), RolesModule, UsersInfModule],
  exports: [UsersService]
})
export class UsersModule {}
