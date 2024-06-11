import styles from "./ArticleCard.module.scss";
import {Eye} from "react-bootstrap-icons";
import {IArticleWithId} from "../../../models/IArticle.ts";
import {Link} from "react-router-dom";

interface ArticleCardProps {
	article: IArticleWithId
}

const ArticleCard = ({ article } : ArticleCardProps) => {
	return (
		<div className={styles.card}>
			<img
				src={`http://localhost:5000/file/${article.fileIds[0]}`}
				alt={article.fileIds[0].toString()}
				className={styles.img}
			/>
			<div className={styles.contentBlock}>
				<div className={styles.upperBlock}>
					<div className={styles.titleTech}>{article.tags.join(' ')}</div>
					<div className={styles.mainInfo}>
						<Link to={`/articles/${article.id}`} className={styles.cardLink}>
							<div className={styles.title}>{article.title}</div>
						</Link>
						<div className={styles.description}>
							{article.text.length > 280
								? article.text.slice(0, 280) + '...'
								: article.text}
						</div>
					</div>
				</div>
				<div className={styles.lowerBlock}>
					<hr style={{margin: 0}}/>
					<div className={styles.additionalInfo}>
						<div className={styles.date}>March 01, 2021</div>
						<div className={styles.blockViews}>
							<Eye/>
							<div className={styles.views}>111</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleCard;
