import styles from "./Navbar.module.scss";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.svg";

const Navbar = () => {
	const navigate = useNavigate()
	const logOut = () => {
		localStorage.clear()
		navigate('/')
	}

    return (
        <div className={styles.navbar}>
			<div className={styles.navLinkBlock}>
				<img src={logo} alt={'logo'} className={styles.logo}/>
				<Link to={'/create-application'} className={styles.btnAuthor}>Стать автором</Link>
			</div>
            <div className={styles.navLinkBlock}>
                <Link to={'/'} className={styles.navLink}>Статьи</Link>
                <Link to={'/'} className={styles.navLink}>Авторы</Link>
            </div>
			{localStorage.getItem('name') !== null ?
				<div className={styles.navLinkBlock}>
					<div>{localStorage.getItem('name')}</div>
					<div onClick={logOut} className={styles.navLink}>Выйти</div>
				</div>
				:
				<div className={styles.navLinkBlock}>
					<Link to={'/login'} className={styles.navLink}>Войти</Link>
					<Link to={'/registration'} className={styles.navLink}>Зарегистрироваться</Link>
				</div>
			}
        </div>
    );
};

export default Navbar;
