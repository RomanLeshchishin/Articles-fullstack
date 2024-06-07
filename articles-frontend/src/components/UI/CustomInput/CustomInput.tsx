import {inputHeight, inputWidth} from "../../../const.ts";
import {FieldError, FieldErrorsImpl, FieldValues, Merge} from "react-hook-form";
import {FieldPathValue} from "react-hook-form";
import CustomTitle from "../CustomTitle/CustomTitle.tsx";
import styles from "./CustomInput.module.scss";
import {ReactNode} from "react";

interface CustomInputProps {
	inpWidth: inputWidth;
	inpHeight: inputHeight;
	label?: string;
	textPlaceholder?: string;
	required: boolean;
	inputValue:  FieldPathValue<FieldValues, any>;
	onChangeInput: (...event: any[]) => void;
	defaultVal?: string;
	errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
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
		errorMessage
	} : CustomInputProps) => {
	return (
		<div className={styles.inputBlock}>
			<CustomTitle label={label} required={required}/>
			<input
				defaultValue={defaultVal}
				style={{width: inpWidth, height: inpHeight}}
				className={styles.customInput}
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
