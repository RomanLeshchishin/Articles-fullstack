import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Application} from "./application.model";

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  imports: [SequelizeModule.forFeature([Application])]
})
export class ApplicationModule {}
