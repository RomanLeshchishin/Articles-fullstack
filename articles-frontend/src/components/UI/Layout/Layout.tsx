import Navbar from "../../Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";
import SideMenu from "../../SideMenu/SideMenu.tsx";

const Layout = () => {
	return (
		<div>
			<Navbar/>
			<div className={styles.mainBlock}>
				<SideMenu/>
				<div className={styles.mainContent}>
					<Outlet/>
				</div>
			</div>
		</div>
	);
};

export default Layout;
