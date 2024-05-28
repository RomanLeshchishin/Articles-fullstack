import styles from "./Application.module.scss";
import {useState} from "react";
import fileIcon from "../../assets/file-word-fill.png";
import axios from "axios";
import {useForm} from "react-hook-form";

const Application = () => {
	const [filename, setFileName] = useState<string>('')
	const [selectedFile, setSelectedFile] = useState(null)

	interface appFormData {
		name: string;
		surname: string;
		nickname: string;
		email: string;
		date: string;
		about: string;
	}

	const initialValuesForm : appFormData = {
		name: '',
		surname: '',
		nickname: '',
		email: '',
		date: '',
		about: ''
	}

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<appFormData>({ defaultValues: initialValuesForm });

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
		return res.data[0]
	}

	const onSubmit = async (data) => {
		const file = await sendForm()
		const appData = {
			...data,
			userId: 30,
			fileId: file.id
		}
		console.log(appData)
		const res = await axios.post('http://localhost:5000/application', appData)
		console.log(res.status)
	}

	return (
		<div className={styles.appForm}>
			<div className={styles.title}>Подача заявки, чтобы стать автором</div>
			<div className={styles.inpForm}>
				<div className={styles.infoForm}>
					<div className={styles.rowInp}>
						<div className={styles.inpBlock}>
							<div className={styles.textBasic} style={{fontSize: "18px"}}>Имя</div>
							<input
								className={styles.customInpSmall}
								{...register('name', {
									required: {
										value: true,
										message: 'Обязательное поле'
									}
								})}
							/>
						</div>
						<div className={styles.inpBlock}>
							<div className={styles.textBasic} style={{fontSize: "18px"}}>Фамилия</div>
							<input
								className={styles.customInpSmall}
								{...register('surname', {
									required: {
										value: true,
										message: 'Обязательное поле'
									}
								})}
							/>
						</div>
					</div>
					<div className={styles.inpBlock}>
						<div className={styles.textBasic} style={{fontSize: "18px"}}>Псевдоним</div>
						<input
							className={styles.customInp}
							{...register('nickname', {
								required: false,
								maxLength: {
									value: 20,
									message: 'Никнейм должен быть не больше 20 символов'
								},
								pattern: /^[A-Za-z]+$/i
							})}
						/>
						<div style={{fontSize: "12px", color: "red"}}>{errors.nickname?.message}</div>
					</div>
					<div className={styles.inpBlock}>
						<div className={styles.textBasic} style={{fontSize: "18px"}}>Email</div>
						<input
							className={styles.customInp}
							{...register('email', {
								required: true,
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: "Неправильный email адрес"
								}
							})}
						/>
						<div style={{fontSize: "12px", color: "red"}}>{errors.email?.message}</div>
					</div>
					<div className={styles.dateForm}>
						<div className={styles.labelDate}>Дата рождения</div>
						<input
							type={"date"}
							className={styles.inpDate}
							{...register('date', {
								required: true
							})}
						/>
					</div>
					<div className={styles.dateForm}>
						<div className={styles.labelDate}>О себе</div>
						<textarea
							className={styles.inpDate}
							{...register('about', {
								required: false,
								minLength: {
									value: 30,
									message: 'Описание должно быть больше 30 символов'
								},
								maxLength: {
									value: 200,
									message: 'Описание не должно превышать 200 символов'
								}
							})}
						/>
						<div style={{fontSize: "12px", color: "red"}}>{errors.about?.message}</div>
					</div>
				</div>
				<div className={styles.uploadForm}>
					<div className={styles.contentUpload}>
						<img src={fileIcon} alt={'file'} className={styles.imgForm}/>
						<div>{filename}</div>
					</div>
					<label className={styles.labelUpload}>
						<input
							type={"file"}
							name={"file"}
							onChange={onChangeUploadFile}
						/>
						<span>Загрузить</span>
					</label>
				</div>
			</div>
			<button className={styles.btnSend} onClick={handleSubmit(onSubmit)}>Отправить</button>
		</div>
	);
};

export default Application;
