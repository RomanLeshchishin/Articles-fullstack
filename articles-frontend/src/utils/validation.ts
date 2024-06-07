import {FieldValues, RegisterOptions} from "react-hook-form";

export const getRules = (fieldName: string) :
	Omit<RegisterOptions<FieldValues, "name">, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined => {
	if (fieldName === "name" || fieldName === "surname" || fieldName === "date") {
		return {required: {value: true, message: 'обязательное поле'}}
	}
	else {
		switch (fieldName) {
			case "nickname":
				return {required: false, maxLength: {value: 20, message: 'Никнейм должен быть не больше 20 символов'}}
			case "email":
				return {
					required: {value: true, message: 'обязательное поле'},
					pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Неправильный email адрес"}
				}
			case "about":
				return {
					required: false,
					minLength: {
						value: 20,
						message: 'Описание должно быть больше 20 символов'
					},
					maxLength: {
						value: 200,
						message: 'Описание не должно превышать 200 символов'
					}
				}
			default:
				return {required: false}
		}
	}
}
