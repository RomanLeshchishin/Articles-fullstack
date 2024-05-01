import {Dispatch, SetStateAction, useState} from "react";
import {Eye, EyeSlash} from "react-bootstrap-icons";
import styles from './ShowHidePassword.module.scss';
import {AuthData} from "../../models/AuthResponse.ts";

interface InputProps{
    textPlaceholder: string;
	inputData: AuthData;
	setInputData: Dispatch<SetStateAction<AuthData>>;
}

const ShowHidePassword = ({textPlaceholder, inputData, setInputData} : InputProps) => {
    const [passwordType, setPasswordType] = useState('password')
    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
            return;
        }
        else {
            setPasswordType('password')
        }
    }
    return (
        <div className={styles.inputGroup}>
            <input
				type={passwordType}
				className={styles.inputPassword}
				placeholder={textPlaceholder}
				value={inputData.password}
				onChange={
				(event) => setInputData({...inputData, password: event.target.value})
			}
			/>
            <span className={styles.showHideBtn} onClick={togglePassword}>
                    {
                        passwordType === 'password' ? <EyeSlash/> : <Eye/>
                    }
            </span>
        </div>
    );
};

export default ShowHidePassword;
