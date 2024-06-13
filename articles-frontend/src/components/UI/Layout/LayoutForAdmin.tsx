import {useAppSelector} from "../../../hooks/redux.ts";
import {Role} from "../../../models/IUser.ts";
import styles from "./Layout.module.scss";
import {Outlet} from "react-router-dom";
import Registration from "../../Auth/Registration.tsx";
import NavbarForAdmin from "../../Navbar/NavbarForAdmin.tsx";

const LayoutForAdmin = () => {
	const { user } = useAppSelector((state) => state.authReducer)
	const userRoles = user.roles ? user.roles.map((role) => role.value) : [Role.NOAUTH]
	return (
		<div>
			{userRoles.includes(Role.ADMIN) ?
				<div>
					<NavbarForAdmin/>
					<div className={styles.mainBlock}>
						<div className={styles.mainContent}>
							<Outlet/>
						</div>
					</div>
				</div>
				: <Registration/> }
		</div>
	);
};

export default LayoutForAdmin;
