import {Column, DataType, Model, Table} from "sequelize-typescript";

interface ArticleCreationAttr {
	userId: number;
	nickname: string;
	date: string;
	topic: string;
	title: string;
	text: string;
	fileIds: number[];
}

@Table({tableName: 'articles'})
export class Article extends Model<Article, ArticleCreationAttr> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.INTEGER, allowNull: false})
	userId: number;

	@Column({type: DataType.STRING, allowNull: false})
	nickname: string;

	@Column({type: DataType.STRING, allowNull: false})
	date: string;

	@Column({type: DataType.CHAR(100), allowNull: false})
	topic: string;

	@Column({type: DataType.CHAR(300), allowNull: false})
	title: string;

	@Column({type: DataType.STRING, allowNull: false})
	text: string;

	@Column({type: DataType.ARRAY(DataType.INTEGER), allowNull: false})
	fileIds: number[];
}
