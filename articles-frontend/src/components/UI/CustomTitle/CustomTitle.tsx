import styles from "../../../styles/_customInput.module.scss";

interface CustomTitleProps {
	label?: string,
	required: boolean
}

const CustomTitle = ({ label, required } : CustomTitleProps) => {
	return (
		<div style={{display: "flex", flexDirection: "row", gap: "5px"}}>
			<div className={styles.textBasic} style={{fontSize: "18px"}}>{label}</div>
			{required ? <div style={{color: "red"}}>*</div> : <div></div>}
		</div>
	);
};

export default CustomTitle;
