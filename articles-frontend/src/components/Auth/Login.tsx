import styles from "./AuthComponents.module.scss";
import { useNavigate } from "react-router-dom";
import {AuthData} from "../../models/AuthResponse.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {loginUser} from "../../store/actions/authActions.ts";
import {useForm} from "react-hook-form";
import {Role} from "../../models/IUser.ts";
import {useEffect} from "react";

const Login = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<{email: string, password: string}>();
	const { user, roles } = useAppSelector((state) => state.authReducer)
	const dispatch = useAppDispatch()
	const login = async (inputData: AuthData) => {
		await dispatch(loginUser(inputData))
	}

	useEffect(() => {
		if (roles.map((role) => role.value).includes(Role.ADMIN)) {
			navigate('/admin-user-table')
		}
		else if (roles.map((role) => role.value).includes(Role.USER)
			|| roles.map((role) => role.value).includes(Role.AUTHOR)) {
			navigate('/')
		}
	}, [user])

    return (
        <div className={styles.authorization}>
            <div className={styles.formLogin}>
                <div className={styles.label}>Войдите в аккаунт</div>
                <div className={styles.formInput}>
									<div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                    <input
												className={styles.customInputGrey}
												placeholder={'Email'}
												{...register("email", {
													required: true
												})}
										/>
										<div style={{fontSize: "12px", color: "red"}}>{errors.email?.message}</div>
									</div>
									<div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
										<input
											className={styles.customInputGrey}
											placeholder={'Пароль'}
											{...register("password", {
												required: true
											})}
										/>
										<div style={{fontSize: "12px", color: "red"}}>{errors.password?.message}</div>
									</div>
                </div>
                <button className={styles.customButtonLogin} onClick={handleSubmit(login)}>Войти</button>
                <div className={styles.account}>
                    <div className={styles.accountText}>Ещё нет аккаунта?</div>
                    <button className={styles.accountLink} onClick={() => navigate('/registration')}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
