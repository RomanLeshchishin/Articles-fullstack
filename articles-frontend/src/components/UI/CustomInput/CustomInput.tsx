import styles from "../../../styles/_customInput.module.scss"
import {Dispatch, SetStateAction} from "react";
import {inputHeight, inputWidth} from "../../../const.ts";

interface CustomInputProps {
	inpWidth: inputWidth;
	inpHeight: inputHeight;
	label?: string;
	textPlaceholder?: string;
	inputData: string;
	setInputData: Dispatch<SetStateAction<string>>;
	required: boolean;
}

const CustomInput = (
	{
		inpWidth,
		inpHeight,
		textPlaceholder,
		label,
		required,
		inputData,
		setInputData
	} : CustomInputProps) => {
	return (
		<div>
			<div style={{display: "flex", flexDirection: "row", gap: "5px"}}>
				<div className={styles.textBasic} style={{fontSize: "18px"}}>{label}</div>
				{required ? <div style={{color: "red"}}>*</div> : <div></div>}
			</div>
			<input
				style={{width: inpWidth, height: inpHeight}}
				className={styles.customInput}
				placeholder={textPlaceholder}
				value={inputData}
				onChange={(event) =>
					setInputData(event.target.value)
				}
			>
			</input>
		</div>
	);
};

export default CustomInput;
