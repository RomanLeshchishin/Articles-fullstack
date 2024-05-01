import {AuthData} from "../../../models/AuthResponse.ts";
import styles from "../../../styles/_customInput.module.scss"
import {Dispatch, SetStateAction} from "react";

interface CustomInputProps {
	inpWidth: inputWidth;
	inpHeight: inputHeight;
	label?: string;
	textPlaceholder?: string;
	inputData: AuthData;
	setInputData: Dispatch<SetStateAction<AuthData>>;
	required: boolean;
}

enum inputWidth {
	sw = '207px',
	mw = '280px',
	lw = '433px'
}

enum inputHeight {
	mw = '30px',
	lw = '40px'
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
			<div>
				<div>{label}</div>
				{required ? <div style={{color: "red"}}>*</div> : <div></div>}
			</div>
			<input
				style={{width: inpWidth, height: inpHeight}}
				className={styles.customInput}
				placeholder={textPlaceholder}
				value={inputData.name}
				onChange={(event) =>
					setInputData({...inputData, name: event.target.value})
				}
			>
			</input>
		</div>
	);
};

export default CustomInput;
