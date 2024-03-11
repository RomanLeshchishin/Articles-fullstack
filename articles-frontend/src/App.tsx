import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Registration from "./components/Auth/Registration.tsx";
import Login from "./components/Auth/Login.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path={'/'} element={<MainPage />}/>
          <Route path={'/login'} element={<Login />}/>
          <Route path={'/registration'} element={<Registration />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
