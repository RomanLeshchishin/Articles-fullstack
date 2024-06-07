import styles from "../Application.module.scss";
import fileIcon from "../../../assets/file-word-fill.png";

interface AppUploadFormProps {
	fileName: string,
	onChangeUploadFile: (e: any) => void
}

const AppUploadForm = ({ fileName, onChangeUploadFile } : AppUploadFormProps) => {
	return (
		<div className={styles.uploadForm}>
			<div className={styles.contentUpload}>
				<img src={fileIcon} alt={'file'} className={styles.imgForm}/>
				<div>{fileName}</div>
			</div>
			<label className={styles.labelUpload}>
				<input
					type={"file"}
					name={"file"}
					onChange={onChangeUploadFile}
				/>
				<span>Загрузить статью</span>
			</label>
		</div>
	);
};

export default AppUploadForm;
