import Navbar from "../../Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";
import SideMenu from "../../SideMenu/SideMenu.tsx";
import {Role} from "../../../models/IUser.ts";
import {decodeToken} from "../../../utils/decodeToken.ts";
import Registration from "../../Auth/Registration.tsx";
import NavbarForAdmin from "../../Navbar/NavbarForAdmin.tsx";
import SideMenuAuthor from "../../SideMenu/SideMenuAuthor.tsx";

interface LayoutProps {
	roles: Role[]
}

const Layout = ({ roles } : LayoutProps) => {
	const userRoles = decodeToken(localStorage.getItem('token')).roles
	const index = userRoles.map((userRole) => roles.indexOf(userRole.value))
	const count = index.filter((e) => e === -1)
	return (
		<div>
			{count.length !== index.length
				? <div>
					{roles.indexOf(Role.ADMIN) !== -1 ? <NavbarForAdmin/> : <Navbar/>}
					<div className={styles.mainBlock}>
						{(roles.length === 1 && roles.indexOf(Role.AUTHOR) !== -1) ? <SideMenuAuthor/> : <SideMenu/>}
						<div className={styles.mainContent}>
							<Outlet/>
						</div>
					</div>
				</div>
				: <Registration/>
			}
		</div>
	);
};

export default Layout;
