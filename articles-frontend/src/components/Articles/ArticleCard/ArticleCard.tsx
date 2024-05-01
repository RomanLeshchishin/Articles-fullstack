import styles from "./ArticleCard.module.scss";
import {Eye} from "react-bootstrap-icons";

const ArticleCard = () => {
	return (
		<div className={styles.card}>
			<img src={''} alt={''} className={styles.img}/>
			<div className={styles.upperBlock}>
				<div className={styles.titleTech}>React</div>
				<div className={styles.mainInfo}>
					<div className={styles.title}>9 Figma design system tips</div>
					<div className={styles.description}>Most of these suggestions are ideal for when you’re dealing with
						design systems or huge design files, but they’re also...</div>
				</div>
				<div className={styles.lowerBlock}>
					<hr/>
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
