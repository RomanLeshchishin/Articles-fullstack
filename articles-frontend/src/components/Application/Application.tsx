import styles from "./Application.module.scss";
import {useState} from "react";
import {useForm} from "react-hook-form";
import AppInputForm from "./AppInputForm.tsx";
import AppUploadForm from "./AppUploadForm.tsx";
import {saveFiles} from "../../store/actions/fileActions.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {createApplication} from "../../store/actions/applicationActions.ts";
import {decodeToken} from "../../utils/decodeToken.ts";

const Application = () => {
	const dispatch = useAppDispatch()
	const { files } = useAppSelector((state) => state.fileReducer)
	const [filename, setFileName] = useState<string>('')
	const [selectedFile, setSelectedFile] = useState(null)
	const { handleSubmit, control } = useForm()

	const onChangeUploadFile = (event) => {
		if (event.target.files.length !== 0) {
			setFileName(event.target.files[0].name)
			setSelectedFile(event.target.files[0])
		}
	}

	const sendForm = async () => {
		if (!selectedFile) {
			alert('Выберите файл')
			return
		}
		const formFileData = new FormData()
		formFileData.append('file', selectedFile)
		dispatch(saveFiles(formFileData))
	}

	const onSubmit = (data) => {
		sendForm()
		const token = localStorage.getItem('token')
		if (token) {
			const file = files[0]
			const appData = {
				...data,
				userId: decodeToken(token).id,
				fileId: file.id
			}
			dispatch(createApplication(appData))
		}
	}

	return (
		<div className={styles.appForm}>
			<div className={styles.title}>Подача заявки, чтобы стать автором</div>
			<div className={styles.inpForm}>
				<AppInputForm control={control}/>
				<AppUploadForm fileName={filename} onChangeUploadFile={onChangeUploadFile}/>
			</div>
			<button className={styles.btnSend} onClick={handleSubmit(onSubmit)}>Отправить</button>
		</div>
	);
};

export default Application;
