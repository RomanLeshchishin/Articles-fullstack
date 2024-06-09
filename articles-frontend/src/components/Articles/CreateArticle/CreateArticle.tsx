import {Controller, useForm} from "react-hook-form";
import styles from "./CreateArticle.module.scss";
import {getRules} from "../../../utils/validation.ts";
import CustomInput, {InputHeight, InputTypes, InputWidth} from "../../UI/CustomInput/CustomInput.tsx";
import addImageIcon from "../../../assets/addImage.svg";
import CustomTitle from "../../UI/CustomTitle/CustomTitle.tsx";
import {ReactNode, useState} from "react";

const CreateArticle = () => {
	const { handleSubmit, control, formState: { errors } } = useForm()
	const [filename, setFileName] = useState<string>('')
	const [selectedFile, setSelectedFile] = useState(null)

	const onChangeUploadFile = (event) => {
		if (event.target.files.length !== 0) {
			setFileName(event.target.files[0].name)
			setSelectedFile(event.target.files[0])
		}
	}

	return (
		<div className={styles.infoForm}>
				<Controller
					control={control}
					rules={getRules("name")}
					render={({ field }) => (
						<CustomInput
							type={InputTypes.ARTICLE}
							inpWidth={InputWidth.xxlw}
							inpHeight={InputHeight.xlw}
							required={true}
							label={"Название статьи"}
							inputValue={field.value}
							onChangeInput={field.onChange}
							errorMessage={errors.name?.message}
						/>
					)}
					name={"name"}
				/>
			<div className={styles.rowInp}>
				<Controller
					control={control}
					rules={getRules("surname")}
					render={({ field }) => (
						<CustomInput
							type={InputTypes.ARTICLE}
							inpWidth={InputWidth.lw}
							inpHeight={InputHeight.xlw}
							required={true}
							label={"Тематика"}
							inputValue={field.value}
							onChangeInput={field.onChange}
							errorMessage={errors.surname?.message}
						/>
					)}
					name={"surname"}
				/>
			<Controller
				control={control}
				rules={getRules("nickname")}
				render={({ field }) => (
					<CustomInput
						type={InputTypes.ARTICLE}
						inpWidth={InputWidth.lw}
						inpHeight={InputHeight.xlw}
						required={false}
						label={"Теги"}
						inputValue={field.value}
						onChangeInput={field.onChange}
						errorMessage={errors.nickname?.message}
					/>
				)}
				name={"nickname"}
			/>
			</div>
			<Controller
				control={control}
				rules={getRules("email")}
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
						errorMessage={errors.email?.message}
					/>
				)}
				name={"email"}
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
					rules={getRules("about")}
					render={({ field }) => (
						<textarea className={styles.inpArticle} value={field.value} onChange={field.onChange}/>
					)}
					name={"about"}
				/>
				<div className={styles.errorText}>{errors.about?.message as ReactNode}</div>
			</div>
		</div>
	);
};

export default CreateArticle;
