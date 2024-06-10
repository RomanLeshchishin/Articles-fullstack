import CustomInput, {InputHeight, InputTypes, InputWidth} from "../../UI/CustomInput/CustomInput.tsx";
import {Control, Controller, DeepRequired, FieldErrorsImpl, FieldValues} from "react-hook-form";
import styles from "./AppInputForm.module.scss";
import {DatePicker} from "antd";
import CustomTitle from "../../UI/CustomTitle/CustomTitle.tsx";
import {decodeToken} from "../../../utils/decodeToken.ts";
import {getRules, RulesType} from "../../../utils/validation.ts";
import {ReactNode} from "react";

interface AppInputFormProps {
	control: Control<FieldValues, any>,
	errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>>
}

const AppInputForm = ({ control, errors } : AppInputFormProps) => {
	const token = localStorage.getItem('token')

	return (
		<div className={styles.infoForm}>
			<div className={styles.rowInp}>
					<Controller
						control={control}
						rules={getRules(RulesType.Required)}
						render={({ field }) => (
							<CustomInput
								type={InputTypes.APPLICATION}
								inpWidth={InputWidth.sw}
								inpHeight={InputHeight.lw}
								required={true}
								label={"Имя"}
								inputValue={field.value}
								onChangeInput={field.onChange}
								errorMessage={errors.name?.message}
							/>
						)}
						name={"name"}
					/>
					<Controller
						control={control}
						rules={getRules(RulesType.Required)}
						render={({ field }) => (
							<CustomInput
								type={InputTypes.APPLICATION}
								inpWidth={InputWidth.sw}
								inpHeight={InputHeight.lw}
								required={true}
								label={"Фамилия"}
								inputValue={field.value}
								onChangeInput={field.onChange}
								errorMessage={errors.surname?.message}
							/>
						)}
						name={"surname"}
					/>
			</div>
			<Controller
				control={control}
				rules={getRules(RulesType.MaxLength, 20)}
				render={({ field }) => (
					<CustomInput
						type={InputTypes.APPLICATION}
						inpWidth={InputWidth.xlw}
						inpHeight={InputHeight.lw}
						required={false}
						label={"Псевдоним"}
						inputValue={field.value}
						onChangeInput={field.onChange}
						errorMessage={errors.nickname?.message}
					/>
				)}
				name={"nickname"}
			/>
			<Controller
				control={control}
				rules={getRules(RulesType.EmailPattern)}
				render={({ field }) => (
					<CustomInput
						type={InputTypes.APPLICATION}
						defaultVal={decodeToken(token).email}
						inpWidth={InputWidth.xlw}
						inpHeight={InputHeight.lw}
						required={true}
						label={"Email"}
						inputValue={field.value}
						onChangeInput={field.onChange}
						errorMessage={errors.email?.message}
					/>
				)}
				name={"email"}
			/>
			<div className={styles.inpBlock}>
				<CustomTitle required={true} label={"Дата рождения"}/>
				<Controller
					control={control}
					rules={getRules(RulesType.Required)}
					render={({ field }) => (
						<DatePicker value={field.value} onChange={field.onChange} className={styles.inpDate} placeholder={''}/>
					)}
					name={"date"}
				/>
				<div className={styles.errorText}>{errors.date?.message as ReactNode}</div>
			</div>
			<div className={styles.inpBlock}>
				<CustomTitle required={false} label={"О себе"}/>
				<Controller
					control={control}
					rules={getRules(RulesType.MinAndMaxLength, 20, 200)}
					render={({ field }) => (
						<textarea className={styles.inpAbout} value={field.value} onChange={field.onChange}/>
					)}
					name={"about"}
				/>
				<div className={styles.errorText}>{errors.about?.message as ReactNode}</div>
			</div>
		</div>
	);
};

export default AppInputForm;
