import {Button, Table, TableProps, Tag} from "antd";
import {getRoleColor} from "../../../utils/adminPanel.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {addUserRole, delUserRole, getUsers} from "../../../store/actions/userActions.ts";
import {Role} from "../../../models/IUser.ts";
import styles from "./userTable.module.scss";

interface DataType {
	key: string;
	name: string;
	email: string;
	roles: Role[];
	userIdForAdd: string;
	userIdForDel: string;
}

const UserTable = () => {
	const dispatch = useAppDispatch()
	const { users, id } = useAppSelector(state => state.userReducer)

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Roles',
			dataIndex: 'roles',
			key: 'roles',
			render: (_, { roles }) => (
				<>
					{roles.map((role) => {
						const color = getRoleColor(role)
						return (
							<Tag color={color} key={role}>
								{role.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: '',
			dataIndex: 'userIdForAdd',
			key: 'userIdForAdd',
			render: (userId) =>
				<Button onClick={() => addRole(userId, Role.AUTHOR)}>
					Добавить роль AUTHOR
				</Button>
		},
		{
			title: '',
			dataIndex: 'userIdForDel',
			key: 'userIdForDel',
			render: (userId) =>
				<Button onClick={() => dispatch(delUserRole(userId))}>
					Удалить роль AUTHOR
				</Button>
		}
	];

	const addRole = (id: string, value: Role) => {
		dispatch(addUserRole({ id, value }))
	}

	const data: DataType[] = users.map((user, count) => {
		return {
			key: count.toString(),
			name: user.name,
			email: user.email,
			roles: user.roles.map((r) => r.value),
			userIdForAdd: user.id.toString(),
			userIdForDel: user.id.toString()
		}
	});

	useEffect(() => {
		dispatch(getUsers())
	}, [])

	useEffect(() => {
		dispatch(getUsers())
	}, [id])

	return (
		<div>
			<Table columns={columns} dataSource={data} />
			<div className={styles.btnAdminBlock}>
				<a href={`http://localhost:5000/file/download-excel`} className={styles.customBtnAdmin}>
					загрузить таблицу с пользователями
				</a>
			</div>
		</div>
	);
};

export default UserTable;
