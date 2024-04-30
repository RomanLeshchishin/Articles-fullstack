import styles from "./AuthComponents.module.scss";
import ShowHidePassword from "./ShowHidePassword.tsx";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {AuthData} from "../../models/AuthResponse.ts";

const Login = () => {
    const navigate = useNavigate()
	const [userData, setUserData] = useState<AuthData>({
		email: '',
		password: ''
	})
	const login = (inputData: AuthData) => {

	}

    return (
        <div className={styles.authorization}>
            <div className={styles.formLogin}>
                <div className={styles.label}>Войдите в аккаунт</div>
                <div className={styles.formInput}>
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
                <button className={styles.customButtonLogin} onClick={() => login(userData)}>Войти</button>
                <div className={styles.account}>
                    <div className={styles.accountText}>Ещё нет аккаунта?</div>
                    <button className={styles.accountLink} onClick={() => navigate('/registration')}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
