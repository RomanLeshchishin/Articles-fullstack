import {TextInput} from "@gravity-ui/uikit";
import EditableInput from "../UI/EditableInput/EditableInput.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {editUserInfo, getUserInfo} from "../../store/actions/userActions.ts";
import {useEffect} from "react";
import styles from "./Account.module.scss";
import {Role} from "../../models/IUser.ts";
import {decodeToken} from "../../utils/decodeToken.ts";

const Account = () => {
	const user = decodeToken(localStorage.getItem("token"))
	const { currentUserInfo } = useAppSelector(state => state.userReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserInfo(user.id))
	}, [])
	return (
		<div className={styles.container}>
			<div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
				<div style={{width: "90px", paddingTop: "6px"}}>Имя</div>
				<TextInput
					className={styles.input}
					pin={'round-round'}
					size={'l'}
					value={user.name}
					disabled
				/>
			</div>
			<div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
				<div style={{width: "90px", paddingTop: "6px"}}>Почта</div>
				<TextInput
					className={styles.input}
					pin={'round-round'}
					size={'l'}
					value={user.email}
					disabled
				/>
			</div>
			{!user.roles.map((role) => role.value).includes(Role.ADMIN)
				?
				<div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
					<EditableInput
						value={currentUserInfo.surname}
						setValue={value =>
							dispatch(editUserInfo({ ...currentUserInfo, surname: value }))
						}
						label={'Фамилия'}
					/>
					<EditableInput
						value={currentUserInfo.age ? currentUserInfo?.age.toString() : ''}
						setValue={value =>
							dispatch(editUserInfo({ ...currentUserInfo, age: parseInt(value) }))
						}
						label={'Возраст'}
					/>
				</div>
				:
				<div></div>
			}
			{user.roles.map((role) => role.value).includes(Role.AUTHOR)
				?
				<EditableInput
				value={currentUserInfo.nickname}
				setValue={value => dispatch(editUserInfo({ ...currentUserInfo, nickname: value }))}
				label={'Псевдоним'}
				/>
				:
				<div></div>
			}
		</div>
	);
};

export default Account;
