import styles from "../../../styles/_customInput.module.scss"
import {inputHeight, inputWidth} from "../../../const.ts";

interface CustomInputProps {
	inpWidth: inputWidth;
	inpHeight: inputHeight;
	label?: string;
	textPlaceholder?: string;
	required: boolean;
	register: any;
	id: string;
}

const CustomInput = (
	{
		inpWidth,
		inpHeight,
		textPlaceholder,
		label,
		required,
		register,
		id
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
				ref={register}
				id={id}
			>
			</input>
		</div>
	);
};

export default CustomInput;
