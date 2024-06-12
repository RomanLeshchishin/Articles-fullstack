import {BrowserRouter, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Registration from "./components/Auth/Registration.tsx";
import Login from "./components/Auth/Login.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
import Layout from "./components/UI/Layout/Layout.tsx";
import Application from "./components/Application/Application.tsx";
import UserTable from "./components/AdminPanel/userTable/userTable.tsx";
import ApplicationTable from "./components/AdminPanel/applicationTable/ApplicationTable.tsx";
import CurrentArticle from "./components/Articles/CurrentArticle/CurrentArticle.tsx";
import {Role} from "./models/IUser.ts";
import CreateArticle from "./components/Articles/CreateArticle/CreateArticle.tsx";
import MyArticlesPage from "./pages/MyArticlesPage/MyArticlesPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
				<Route element={<Layout roles={[Role.NOAUTH, Role.USER, Role.AUTHOR]}/>}>
					<Route path={'/'} element={<MainPage />}/>
					<Route path={'/create-application'} element={<Application />}/>
					<Route path={'/articles/:id'} element={<CurrentArticle />}/>
				</Route>
				<Route element={<Layout roles={[Role.AUTHOR]}/>}>
					<Route path={'/create-article'} element={<CreateArticle />}/>
					<Route path={'/my-articles'} element={<MyArticlesPage />}/>
				</Route>
				<Route element={<Layout roles={[Role.ADMIN]}/>}>
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
