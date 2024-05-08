import Navbar from "../../components/Navbar/Navbar.tsx";
import ArticleCard from "../../components/Articles/ArticleCard/ArticleCard.tsx";
import Application from "../../components/Application/Application.tsx";

const MainPage = () => {
    return (
        <div>
            <Navbar/>
			<div style={{height: "94.4vh", backgroundColor: "#F5F5F5"}}>
				<ArticleCard/>
				<Application/>
			</div>
        </div>
    );
};

export default MainPage;
