import {Table, TableProps} from "antd";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {getApplications} from "../../../store/actions/applicationActions.ts";

interface DataType {
	key: string;
	name: string;
	surname: string;
	nickname: string;
	email: string;
	file: number;
}

const ApplicationTable = () => {
	const dispatch = useAppDispatch()
	const { applications } = useAppSelector(state => state.applicationReducer)

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Фамилия',
			dataIndex: 'surname',
			key: 'surname',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Псевдоним',
			dataIndex: 'nickname',
			key: 'nickname',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Файл',
			dataIndex: 'file',
			key: 'file',
			render: (fileId) =>
				<a href={`http://localhost:5000/file/download-file/${fileId}`}>
					загрузить заявку
				</a>
		}
	];

	const data: DataType[] = applications.map((app, count) => {
		return {
			key: count.toString(),
			name: app.name,
			surname: app.surname,
			nickname: app.nickname,
			email: app.email,
			file: app.fileId
		}
	});

	useEffect(() => {
		dispatch(getApplications())
	}, [])

	return (
		<div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default ApplicationTable;
