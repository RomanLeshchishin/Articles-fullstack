import {Controller, useForm} from "react-hook-form";
import styles from "./CreateArticle.module.scss";
import {getRules, RulesType} from "../../../utils/validation.ts";
import CustomInput, {InputHeight, InputTypes, InputWidth} from "../../UI/CustomInput/CustomInput.tsx";
import addImageIcon from "../../../assets/addImage.svg";
import CustomTitle from "../../UI/CustomTitle/CustomTitle.tsx";
import {ReactNode, useState} from "react";
import SelectTopic from "./Selectors/SelectTopic.tsx";
import SelectTag from "./Selectors/SelectTag.tsx";
import {saveFiles} from "../../../store/actions/fileActions.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {decodeToken} from "../../../utils/decodeToken.ts";
import {createArticle} from "../../../store/actions/articleActions.ts";
import {IArticle} from "../../../models/IArticle.ts";

const CreateArticle = () => {
	const dispatch = useAppDispatch()
	const { files } = useAppSelector((state) => state.fileReducer)
	const { handleSubmit, control, formState: { errors } } = useForm()
	const [filename, setFileName] = useState<string>('')
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
		const formFileData = new FormData()
		formFileData.append('file', selectedFile)
		dispatch(saveFiles(formFileData))
	}

	const onSubmit = (data) => {
		sendForm()
		const token = localStorage.getItem('token')
		if (token) {
			const file = files[0]
			const articleData: IArticle = {
				userId: decodeToken(token).id,
				title: data.title,
				nickname: data.nickname,
				topic: data.topic.value,
				tags: data.tags.map((tag) => tag.value),
				text: data.text,
				fileIds: [file.id],
				checked: true
			}
			console.log(articleData)
			dispatch(createArticle(articleData))
		}
	}

	return (
		<div className={styles.infoForm}>
				<Controller
					control={control}
					rules={getRules(RulesType.Required)}
					render={({ field }) => (
						<CustomInput
							type={InputTypes.ARTICLE}
							inpWidth={InputWidth.xxlw}
							inpHeight={InputHeight.xlw}
							required={true}
							label={"Название статьи"}
							inputValue={field.value}
							onChangeInput={field.onChange}
							errorMessage={errors.title?.message}
						/>
					)}
					name={"title"}
				/>
			<div className={styles.rowInp}>
				<div className={styles.inpBlock}>
					<CustomTitle required={true} label={"Тематика"}/>
					<Controller
						control={control}
						rules={getRules(RulesType.Required)}
						render={({ field }) => (
							<SelectTopic valueTopic={field.value} onChangeTopic={field.onChange}/>
						)}
						name={"topic"}
					/>
					<div className={styles.errorText}>{errors.topic?.message as ReactNode}</div>
				</div>
				<div className={styles.inpBlock}>
					<CustomTitle required={false} label={"Теги"}/>
					<Controller
						control={control}
						rules={getRules()}
						render={({ field }) => (
							<SelectTag valueTags={field.value} onChangeTags={field.onChange}/>
						)}
						name={"tags"}
					/>
				</div>
			</div>
			<Controller
				control={control}
				rules={getRules(RulesType.MaxLength, 20)}
				render={({ field }) => (
					<CustomInput
						type={InputTypes.ARTICLE}
						defaultVal={''}
						inpWidth={InputWidth.xxlw}
						inpHeight={InputHeight.xlw}
						required={true}
						label={"Псевдоним"}
						inputValue={field.value}
						onChangeInput={field.onChange}
						errorMessage={errors.nickname?.message}
					/>
				)}
				name={"nickname"}
			/>
			<div className={styles.uploadForm}>
				<label className={styles.labelUpload}>
					<input
						type={"file"}
						name={"file"}
						onChange={onChangeUploadFile}
					/>
					<img src={addImageIcon} alt={'file'} className={styles.imgForm}/>
				</label>
				<div className={styles.contentUpload}>
					<div>{filename}</div>
				</div>
			</div>
			<div className={styles.inpBlock}>
				<CustomTitle required={true} label={"Текст статьи"}/>
				<Controller
					control={control}
					rules={getRules(RulesType.MinLength, 10)}
					render={({ field }) => (
						<textarea className={styles.inpArticle} value={field.value} onChange={field.onChange}/>
					)}
					name={"text"}
				/>
				<div className={styles.errorText}>{errors.text?.message as ReactNode}</div>
			</div>
			<button className={styles.submitBtn} onClick={handleSubmit(onSubmit)}>Отправить</button>
		</div>
	);
};

export default CreateArticle;
