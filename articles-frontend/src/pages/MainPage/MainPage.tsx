import ArticleCard from "../../components/Articles/ArticleCard/ArticleCard.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {getCheckedArticles} from "../../store/actions/articleActions.ts";

const MainPage = () => {
	const dispatch = useAppDispatch()
	const { articles } = useAppSelector((state) => state.articleReducer)
	useEffect(() => {
		dispatch(getCheckedArticles('checked'))
	}, [])
	return (
		<div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
			{articles.map((article, count) => <ArticleCard key={count} article={article}/>)}
		</div>
	);
};

export default MainPage;
