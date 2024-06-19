import {Button, Icon, TextInput, ThemeProvider} from "@gravity-ui/uikit";
import { FloppyDisk, Pencil } from "@gravity-ui/icons";
import {useState} from "react";
import styles from "./EditableInput.module.scss";

type EditableInputProps = {
	value?: string;
	setValue: (value: string) => void;
	label: string;
};

const EditableInput = ({value, setValue, label}: EditableInputProps) => {
	const [disabled, setDisabled] = useState(true);
	return (
		<ThemeProvider theme={'light-hc'}>
			<div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
				<div style={{width: "90px", paddingTop: "6px"}}>{label}</div>
				<TextInput
					value={value}
					onUpdate={newValue => setValue(newValue)}
					className={styles.input}
					disabled={disabled}
					label={''}
					pin={'round-round'}
					size={'l'}
					endContent={
						<Button
							view={'outlined-info'}
							pin={'round-round'}
							selected
							onClick={() => {
								if (!disabled) {
									setValue(value || '');
								}
								setDisabled(prevState => !prevState);
							}}
						>
							<Icon data={disabled ? Pencil : FloppyDisk} />
						</Button>
					}
				/>
			</div>
		</ThemeProvider>
	);
};

export default EditableInput;
