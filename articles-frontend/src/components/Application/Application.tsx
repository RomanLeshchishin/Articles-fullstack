import styles from "./Application.module.scss";
import CustomInput from "../UI/CustomInput/CustomInput.tsx";
import {inputHeight, inputWidth} from "../../const.ts";
import {useState} from "react";
import {decodeToken} from "../../utils/decodeToken.ts";
import fileIcon from "../../assets/file-word-fill.png";
import axios from "axios";

const Application = () => {
	const [name, setName] = useState<string>(
		localStorage.getItem('token')
			? decodeToken(localStorage.getItem('token') || '').name
			: ''
	)
	const [surname, setSurname] = useState<string>('')
	const [nickName, setNickName] = useState<string>('')
	const [email, setEmail] = useState<string>(
		localStorage.getItem('token')
		? decodeToken(localStorage.getItem('token') || '').email
		: ''
	)
	const [date, setDate] = useState<string>('')
	const [about, setAbout] = useState<string>('')
	const [filename, setFileName] = useState<string>('Загрузить')
	const [selectedFile, setSelectedFile] = useState(null)

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

		const formData = new FormData()
		formData.append('file', selectedFile)

		const res = await axios.post('http://localhost:5000/file', formData)
		console.log(res.data)
	}

	return (
		<div className={styles.appForm}>
			<div className={styles.title}>Подача заявки, чтобы стать автором</div>
			<div className={styles.inpForm}>
				<div className={styles.infoForm}>
					<div className={styles.rowInp}>
						<CustomInput
							inpWidth={inputWidth.sw}
							inpHeight={inputHeight.mw}
							label={'Имя'}
							inputData={name}
							setInputData={setName}
							required={true}
						/>
						<CustomInput
							inpWidth={inputWidth.sw}
							inpHeight={inputHeight.mw}
							label={'Фамилия'}
							inputData={surname}
							setInputData={setSurname}
							required={true}
						/>
					</div>
					<CustomInput
							inpWidth={inputWidth.lw}
							inpHeight={inputHeight.mw}
							label={'Псевдоним'}
							inputData={nickName}
							setInputData={setNickName}
							required={false}
					/>
					<CustomInput
							inpWidth={inputWidth.lw}
							inpHeight={inputHeight.mw}
							label={'Email'}
							inputData={email}
							setInputData={setEmail}
							required={true}
					/>
					<div className={styles.dateForm}>
						<div className={styles.labelDate}>Дата рождения</div>
						<input
							type={"date"}
							className={styles.inpDate}
							value={date}
							onChange={(event) => setDate(event.target.value)}/>
					</div>
					<div className={styles.dateForm}>
						<div className={styles.labelDate}>О себе</div>
						<textarea
							className={styles.inpDate}
							value={about}
							onChange={(event) => setAbout(event.target.value)}/>
					</div>
				</div>
				<div className={styles.uploadForm}>
					<img src={fileIcon} alt={'file'} className={styles.imgForm}/>
					<label className={styles.labelUpload}>
						<input
							type={"file"}
							name={"file"}
							onChange={onChangeUploadFile}/>
						<span>{filename}</span>
					</label>
				</div>
			</div>
			<button className={styles.btnSend} onClick={sendForm}>Отправить</button>
		</div>
	);
};

export default Application;
