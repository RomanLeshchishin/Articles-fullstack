import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ApplicationModule } from './application/application.module';
import { ArticleModule } from './article/article.module';
import {UploadFile} from "./file/file.model";
import {Application} from "./application/application.model";
import {Article} from "./article/article.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, UploadFile, Application, Article],
            autoLoadModels: true
    }),
        UsersModule,
        RolesModule,
        AuthModule,
        FileModule,
        ApplicationModule,
        ArticleModule,
    ]
})
export class AppModule {
}
