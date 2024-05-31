import ArticleCard from "../../components/Articles/ArticleCard/ArticleCard.tsx";

const MainPage = () => {
    return (
			<div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
				<ArticleCard/>
				<ArticleCard/>
				<ArticleCard/>
			</div>
    );
};

export default MainPage;
