import styles from "./CurrentArticle.module.scss";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {useEffect} from "react";
import {getCurrentArticle} from "../../../store/slices/articleSlice.ts";

const CurrentArticle = () => {
	const dispatch = useAppDispatch()
  const { id } = useParams()
	const { currentArticle } = useAppSelector((state) => state.articleReducer)

	useEffect(() => {
		if (id) {
			const intId = parseInt(id)
			if (intId !== currentArticle?.id) {
				dispatch(getCurrentArticle(intId))
			}
		}
	}, [id])

	return (
		<div style={{display: "flex", flexDirection: "column", gap: "15px", width: "700px"}}>
			<div className={styles.textLogin}>{currentArticle?.nickname}</div>
			<div className={styles.textTitle}>{currentArticle?.title}</div>
			<img src={`http://localhost:5000/file/${currentArticle?.fileIds}`} alt={currentArticle?.title}/>
			<div style={{paddingBottom: "20px"}}>{currentArticle?.text}</div>
		</div>
	);
};

export default CurrentArticle;
