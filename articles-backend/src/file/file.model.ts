import {Column, DataType, Model, Table} from "sequelize-typescript";

interface FileCreationAttr {
	filename: string;
	file: Uint8Array;
}

@Table({tableName: 'files'})
export class UploadFile extends Model<UploadFile, FileCreationAttr> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.STRING, allowNull: false})
	filename: string;

	@Column({type: 'bytea', allowNull: false})
	file: Uint8Array;
}
