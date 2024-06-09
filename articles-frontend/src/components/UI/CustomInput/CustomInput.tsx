import {FieldError, FieldErrorsImpl, FieldValues, Merge} from "react-hook-form";
import {FieldPathValue} from "react-hook-form";
import CustomTitle from "../CustomTitle/CustomTitle.tsx";
import styles from "./CustomInput.module.scss";
import {ReactNode} from "react";

export enum InputWidth {
	sw = '207px',
	mw = '280px',
	lw = '347px',
	xlw = '433px',
	xxlw = '735px'
}

export enum InputHeight {
	mw = '30px',
	lw = '40px',
	xlw = '45px'
}

export enum InputTypes {
	AUTH = "auth",
	APPLICATION = "app",
	ARTICLE = "article"
}

interface CustomInputProps {
	inpWidth: InputWidth;
	inpHeight: InputHeight;
	label?: string;
	textPlaceholder?: string;
	required: boolean;
	inputValue:  FieldPathValue<FieldValues, any>;
	onChangeInput: (...event: any[]) => void;
	defaultVal?: string;
	errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	type: InputTypes;
}

const CustomInput = (
	{
		inpWidth,
		inpHeight,
		textPlaceholder,
		label,
		required,
		inputValue,
		onChangeInput,
		defaultVal,
		errorMessage,
		type
	} : CustomInputProps) => {
	return (
		<div className={styles.inputBlock}>
			<CustomTitle label={label} required={required}/>
			<input
				defaultValue={defaultVal}
				style={{width: inpWidth, height: inpHeight}}
				className={type === InputTypes.APPLICATION ? styles.customInputGrey : styles.customInputBlue}
				placeholder={textPlaceholder}
				value={inputValue}
				onChange={onChangeInput}
			>
			</input>
			<div className={styles.errorText}>{errorMessage as ReactNode}</div>
		</div>
	);
};

export default CustomInput;
