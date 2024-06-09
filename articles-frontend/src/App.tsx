import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Registration from "./components/Auth/Registration.tsx";
import Login from "./components/Auth/Login.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
import Layout from "./components/UI/Layout/Layout.tsx";
import Application from "./components/Application/Application.tsx";
import UserTable from "./components/AdminPanel/userTable/userTable.tsx";
import LayoutAdmin from "./components/UI/Layout/LayoutAdmin.tsx";
import ApplicationTable from "./components/AdminPanel/applicationTable/ApplicationTable.tsx";
import CreateArticle from "./components/Articles/CreateArticle/CreateArticle.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
				<Route element={<Layout/>}>
					<Route path={'/'} element={<MainPage />}/>
					<Route path={'/create-article'} element={<CreateArticle />}/>
					<Route path={'/create-application'} element={<Application />}/>
				</Route>
				<Route element={<LayoutAdmin/>}>
					<Route path={'/admin-application-table'} element={<ApplicationTable />}/>
					<Route path={'/admin-user-table'} element={<UserTable />}/>
				</Route>
				<Route path={'/login'} element={<Login />}/>
				<Route path={'/registration'} element={<Registration />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
