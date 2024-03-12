import styles from "./Navbar.module.scss";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>Лого</div>
            <div className={styles.navLinkBlock}>
                <Link to={''} className={styles.navLink}>Статьи</Link>
                <Link to={''} className={styles.navLink}>Авторы</Link>
            </div>
            <div className={styles.navLinkBlock}>
                <Link to={''} className={styles.navLink}>Войти</Link>
                <Link to={''} className={styles.navLink}>Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default Navbar;
