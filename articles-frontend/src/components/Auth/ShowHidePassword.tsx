import {useState} from "react";
import {Eye, EyeSlash} from "react-bootstrap-icons";
import styles from './ShowHidePassword.module.scss';

export interface InputProps{
    textPlaceholder: string;
}

const ShowHidePassword = ({textPlaceholder} : InputProps) => {
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
            <input type={passwordType} className={styles.inputPassword} placeholder={textPlaceholder}/>
            <span className={styles.showHideBtn} onClick={togglePassword}>
                    {
                        passwordType === 'password' ? <EyeSlash/> : <Eye/>
                    }
            </span>
        </div>
    );
};

export default ShowHidePassword;
