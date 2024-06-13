import Navbar from "../../Navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";
import SideMenu from "../../SideMenu/SideMenu.tsx";
import {Role} from "../../../models/IUser.ts";
import {decodeToken} from "../../../utils/decodeToken.ts";
import Registration from "../../Auth/Registration.tsx";
import {authorLinks, baseLinks} from "../../../../const/sideMenu.ts";

interface LayoutProps {
	roles: Role[]
}

const Layout = ({ roles } : LayoutProps) => {
	const userRoles = localStorage.getItem('token')
		? decodeToken(localStorage.getItem('token')).roles
		: [{value: Role.NOAUTH, description: 'не авторизован'}]
	const index = userRoles.map((userRole) => roles.indexOf(userRole.value))
	const count = index.filter((e) => e === -1)
	return (
		<div>
			{count.length !== index.length
				? <div>
					<Navbar/>
					<div className={styles.mainBlock}>
						{userRoles.map((role) => role.value).includes(Role.AUTHOR)
							? <SideMenu links={[...baseLinks, ...authorLinks]}/>
							: <SideMenu links={baseLinks}/>}
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
