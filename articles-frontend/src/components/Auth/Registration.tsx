import styles from './AuthComponents.module.scss';
import ShowHidePassword from "./ShowHidePassword.tsx";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {AuthData} from "../../models/AuthResponse.ts";
import {useAppDispatch} from "../../hooks/redux.ts";
import {registerUser} from "../../store/actions/authActions.ts";

const Registration = () => {
    const navigate = useNavigate()
	const [userData, setUserData] = useState<AuthData>({
		name: '',
		email: '',
		password: ''
	})
	const dispatch = useAppDispatch()
	const registration = async (inputData: AuthData) => {
		await dispatch(registerUser(inputData))
		navigate('/')
	}

    return (
        <div className={styles.authorization}>
            <div className={styles.formRegistration}>
                <div className={styles.label}>Начни с создания аккаунта</div>
                <div className={styles.formInput}>
                    <input
						className={styles.customInput}
						placeholder={'Имя'}
						value={userData.name}
						onChange={
						(event) => setUserData({...userData, name: event.target.value})
					}
					/>
                    <input
						className={styles.customInput}
						placeholder={'Email'}
						value={userData.email}
						onChange={
						(event) => setUserData({...userData, email: event.target.value})
						}
					/>
                    <ShowHidePassword
						textPlaceholder={'Пароль'}
						inputData={userData}
						setInputData={setUserData}
					/>
                </div>
                <button
					className={styles.customButtonRegistration}
					onClick={() => registration(userData)}
				>
					Зарегистрироваться
				</button>
                <div className={styles.account}>
                    <div className={styles.accountText}>Уже есть аккаунт?</div>
                    <button className={styles.accountLink} onClick={() => navigate('/login')}>Войти</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
