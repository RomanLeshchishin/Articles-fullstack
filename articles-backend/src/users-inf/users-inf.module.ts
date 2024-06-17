import { Module } from '@nestjs/common';
import { UsersInfController } from './users-inf.controller';
import {UsersInfService} from "./users-inf.service";
import {JwtStrategy} from "../auth/jwt.strategy";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserInf} from "./users-inf.model";

@Module({
  controllers: [UsersInfController],
	providers: [UsersInfService, JwtStrategy],
	imports: [SequelizeModule.forFeature([UserInf])],
	exports: [UsersInfService]
})
export class UsersInfModule {}
