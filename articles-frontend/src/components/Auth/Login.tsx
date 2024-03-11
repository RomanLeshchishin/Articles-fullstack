import styles from "./AuthComponents.module.scss";
import ShowHidePassword from "./ShowHidePassword.tsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.authorization}>
            <div className={styles.formLogin}>
                <div className={styles.label}>Войдите в аккаунт</div>
                <div className={styles.formInput}>
                    <input className={styles.customInput} placeholder={'Email'}/>
                    <ShowHidePassword textPlaceholder={'Пароль'}/>
                </div>
                <button className={styles.customButtonLogin}>Войти</button>
                <div className={styles.account}>
                    <div className={styles.accountText}>Ещё нет аккаунта?</div>
                    <button className={styles.accountLink} onClick={() => navigate('/registration')}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
