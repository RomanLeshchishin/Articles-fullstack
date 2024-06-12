import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {useEffect} from "react";
import {decodeToken} from "../../utils/decodeToken.ts";
import {getArticlesById} from "../../store/actions/articleActions.ts";
import ArticleCard from "../../components/Articles/ArticleCard/ArticleCard.tsx";

const MyArticlesPage = () => {
	const dispatch = useAppDispatch()
	const userId = localStorage.getItem('token') ? decodeToken(localStorage.getItem('token')).id : null
	const { myArticles } = useAppSelector((state) => state.articleReducer)

	useEffect(() => {
		if (userId) {
			dispatch(getArticlesById(userId))
		}
	}, [])
	return (
		<div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
			{myArticles.map((article, count) => <ArticleCard key={count} article={article}/>)}
		</div>
	);
};

export default MyArticlesPage;
