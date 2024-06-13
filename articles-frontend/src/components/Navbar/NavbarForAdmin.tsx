import styles from "./Navbar.module.scss";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.svg";

const NavbarForAdmin = () => {
	const navigate = useNavigate()
	const logOut = () => {
		localStorage.clear()
		window.location.reload();
		navigate('/')
	}

	return (
		<div className={styles.navbar}>
			<div className={styles.navLinkBlock}>
				<img src={logo} alt={'logo'} className={styles.logo}/>
			</div>
			<div className={styles.navLinkBlock}>
				<Link to={'/admin-user-table'} className={styles.navLink}>Пользователи</Link>
				<Link to={'/admin-application-table'} className={styles.navLink}>Заявки</Link>
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

export default NavbarForAdmin;
