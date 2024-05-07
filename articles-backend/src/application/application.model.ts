import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApplicationCreationAttr} from "./application.interface";

@Table({tableName: 'applications'})
export class Application extends Model<Application, ApplicationCreationAttr> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.INTEGER, allowNull: false})
	userId: number;

	@Column({type: DataType.STRING, allowNull: false})
	name: string;

	@Column({type: DataType.STRING, allowNull: false})
	surname: string;

	@Column({type: DataType.CHAR(20), allowNull: false})
	nickname: string;

	@Column({type: DataType.STRING, allowNull: false})
	email: string;

	@Column({type: DataType.STRING, allowNull: false})
	date: string;

	@Column({type: DataType.CHAR(400), allowNull: false})
	about: string;

	@Column({type: DataType.INTEGER, allowNull: false})
	fileId: number;
}
