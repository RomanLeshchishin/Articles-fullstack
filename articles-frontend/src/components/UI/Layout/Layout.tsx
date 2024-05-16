import Navbar from "../../Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout = () => {
	return (
		<div>
			<Navbar/>
			<div className={styles.mainContent}>
				<Outlet/>
			</div>
		</div>
	);
};

export default Layout;
