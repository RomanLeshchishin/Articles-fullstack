import styles from './AuthComponents.module.scss';
import { useNavigate } from "react-router-dom";
import {AuthData} from "../../models/AuthResponse.ts";
import {useAppDispatch} from "../../hooks/redux.ts";
import {registerUser} from "../../store/actions/authActions.ts";
import {useForm} from "react-hook-form";

const Registration = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<{name: string, email: string, password: string}>();
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
									<div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                    <input
											className={styles.customInputGrey}
											placeholder={'Имя'}
											{...register("name", {
												required: true,
												pattern: /^[A-Za-z]+$/i,
												maxLength: {
													value: 20,
													message: 'Username должно быть не более 20 символов'
												}
											})}
										/>
										<div style={{fontSize: "12px", color: "red"}}>{errors.name?.message}</div>
									</div>
									<div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
										<input
											className={styles.customInputGrey}
											placeholder={'Email'}
											{...register("email", {
												required: true,
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
													message: "Неправильный email адрес"
												}
											})}
										/>
										<div style={{fontSize: "12px", color: "red"}}>{errors.email?.message}</div>
									</div>
									<div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
										<input
											className={styles.customInputGrey}
											placeholder={'Пароль'}
											{...register("password", {
												required: true,
												minLength: {
													value: 5,
													message: 'Пароль должно быть больше 4 символов'
												}
											})}
										/>
										<div style={{fontSize: "12px", color: "red"}}>{errors.password?.message}</div>
									</div>
                </div>
                <button
					className={styles.customButtonRegistration}
					onClick={handleSubmit(registration)}
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
