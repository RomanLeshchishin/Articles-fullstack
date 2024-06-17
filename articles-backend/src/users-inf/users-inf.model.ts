import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UserInfCreationAttr {
	userId: number;
	surname: string;
	age: number;
	avatar: number;
	nickname: string;
	interests: string[];
}

@Table({tableName: 'users-inf'})
export class UserInf extends Model<UserInf, UserInfCreationAttr> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.INTEGER, allowNull: false})
	userId: number;

	@Column({type: DataType.STRING, allowNull: true})
	nickname: string;

	@Column({type: DataType.INTEGER, allowNull: true})
	avatar: number;

	@Column({type: DataType.STRING, allowNull: true})
	surname: string;

	@Column({type: DataType.INTEGER, allowNull: true})
	age: number;

	@Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
	interests: string[];
}
