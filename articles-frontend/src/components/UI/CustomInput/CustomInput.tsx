import styles from "../../../styles/_customInput.module.scss"
import {inputHeight, inputWidth} from "../../../const.ts";
import {FieldValues} from "react-hook-form";
import {FieldPathValue} from "react-hook-form";
import CustomTitle from "../CustomTitle/CustomTitle.tsx";

interface CustomInputProps {
	inpWidth: inputWidth;
	inpHeight: inputHeight;
	label?: string;
	textPlaceholder?: string;
	required: boolean;
	inputValue:  FieldPathValue<FieldValues, any>;
	onChangeInput: (...event: any[]) => void;
	defaultVal?: string;
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
		defaultVal
	} : CustomInputProps) => {
	return (
		<div>
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
		</div>
	);
};

export default CustomInput;
