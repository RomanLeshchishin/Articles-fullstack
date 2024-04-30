import styles from "./Navbar.module.scss";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux.ts";

const Navbar = () => {
	const {user} = useAppSelector(state => state.authReducer)
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>Лого</div>
            <div className={styles.navLinkBlock}>
                <Link to={''} className={styles.navLink}>Статьи</Link>
                <Link to={''} className={styles.navLink}>Авторы</Link>
            </div>
			{user.name !== undefined ? user.name :
				<div className={styles.navLinkBlock}>
					<Link to={'/login'} className={styles.navLink}>Войти</Link>
					<Link to={'/registration'} className={styles.navLink}>Зарегистрироваться</Link>
				</div>
			}
        </div>
    );
};

export default Navbar;
