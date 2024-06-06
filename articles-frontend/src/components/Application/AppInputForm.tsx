import CustomInput from "../UI/CustomInput/CustomInput.tsx";
import {inputHeight, inputWidth} from "../../const.ts";
import {Control, Controller, FieldValues} from "react-hook-form";
import styles from "./AppInputForm.module.scss";
import {DatePicker} from "antd";
import CustomTitle from "../UI/CustomTitle/CustomTitle.tsx";
import {decodeToken} from "../../utils/decodeToken.ts";

interface AppInputFormProps {
	control:  Control<FieldValues, any>
}

const AppInputForm = ({ control } : AppInputFormProps) => {
	const token = localStorage.getItem('token')

	return (
		<div className={styles.infoForm}>
			<div className={styles.rowInp}>
					<Controller
						control={control}
						render={({ field }) => (
							<CustomInput
								inpWidth={inputWidth.sw}
								inpHeight={inputHeight.lw}
								required={true}
								label={"Имя"}
								inputValue={field.value}
								onChangeInput={field.onChange}
							/>
						)}
						name={"name"}
					/>
					<Controller
						control={control}
						render={({ field }) => (
							<CustomInput
								inpWidth={inputWidth.sw}
								inpHeight={inputHeight.lw}
								required={true}
								label={"Фамилия"}
								inputValue={field.value}
								onChangeInput={field.onChange}
							/>
						)}
						name={"surname"}
					/>
			</div>
			<Controller
				control={control}
				render={({ field }) => (
					<CustomInput
						inpWidth={inputWidth.lw}
						inpHeight={inputHeight.lw}
						required={false}
						label={"Псевдоним"}
						inputValue={field.value}
						onChangeInput={field.onChange}
					/>
				)}
				name={"nickname"}
			/>
			<Controller
				control={control}
				render={({ field }) => (
					<CustomInput
						defaultVal={decodeToken(token).email}
						inpWidth={inputWidth.lw}
						inpHeight={inputHeight.lw}
						required={true}
						label={"Email"}
						inputValue={field.value}
						onChangeInput={field.onChange}
					/>
				)}
				name={"email"}
			/>
			<div className={styles.inpBlock}>
				<CustomTitle required={true} label={"Дата рождения"}/>
				<Controller
					control={control}
					render={({ field }) => (
						<DatePicker value={field.value} onChange={field.onChange} className={styles.inpDate} placeholder={''}/>
					)}
					name={"date"}
				/>
			</div>
			<div className={styles.inpBlock}>
				<CustomTitle required={false} label={"О себе"}/>
				<Controller
					control={control}
					render={({ field }) => (
						<textarea className={styles.inpAbout} value={field.value} onChange={field.onChange}/>
					)}
					name={"about"}
				/>
			</div>
		</div>
	);
};

export default AppInputForm;
