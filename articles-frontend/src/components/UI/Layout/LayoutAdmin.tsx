import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";
import NavbarForAdmin from "../../Navbar/NavbarForAdmin.tsx";

const LayoutAdmin = () => {
	return (
		<div>
			<NavbarForAdmin/>
			<div className={styles.mainContent}>
				<Outlet/>
			</div>
		</div>
	);
};

export default LayoutAdmin ;
