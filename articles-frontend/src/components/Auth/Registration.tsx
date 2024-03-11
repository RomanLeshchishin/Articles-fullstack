import styles from './AuthComponents.module.scss';
import ShowHidePassword from "./ShowHidePassword.tsx";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.authorization}>
            <div className={styles.formRegistration}>
                <div className={styles.label}>Начни с создания аккаунта</div>
                <div className={styles.formInput}>
                    <input className={styles.customInput} placeholder={'Имя'}/>
                    <input className={styles.customInput} placeholder={'Email'}/>
                    <ShowHidePassword textPlaceholder={'Пароль'}/>
                    <ShowHidePassword textPlaceholder={'Повторите пароль'}/>
                </div>
                <button className={styles.customButtonRegistration}>Зарегистрироваться</button>
                <div className={styles.account}>
                    <div className={styles.accountText}>Уже есть аккаунт?</div>
                    <button className={styles.accountLink} onClick={() => navigate('/login')}>Войти</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
