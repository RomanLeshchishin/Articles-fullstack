import {FieldValues, RegisterOptions} from "react-hook-form";

export enum RulesType {
	Required = 'required',
	MaxLength = 'maxLength',
	MinLength = 'minLength',
	MinAndMaxLength = 'minAndMaxLength',
	EmailPattern = 'emailPattern',
	Default = ''
}

export const getRules = (rulesType: RulesType = RulesType.Default, countSymbolsMin: number = 0, countSymbolsMax: number = 0) :
	Omit<RegisterOptions<FieldValues, "name">, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined => {
	switch (rulesType) {
		case RulesType.Required:
			return {required: {value: true, message: 'обязательное поле'}}
		case RulesType.MaxLength:
			return {
				required: false,
				maxLength: {
					value: countSymbolsMin,
					message: `Никнейм должен быть не больше ${countSymbolsMin} символов`
				}
			}
		case RulesType.MinLength:
			return {
				required: true,
				minLength: {
					value: countSymbolsMin,
					message: `Описание должно быть больше ${countSymbolsMin} символов`
				}
			}
		case RulesType.MinAndMaxLength:
			return {
				required: false,
				minLength: {
					value: countSymbolsMin,
					message: `Описание должно быть больше ${countSymbolsMin} символов`
				},
				maxLength: {
					value: countSymbolsMax,
					message: `Описание не должно превышать ${countSymbolsMax} символов`
				}
			}
		case RulesType.EmailPattern:
			return {
				required: {value: true, message: 'обязательное поле'},
				pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Неправильный email адрес"}
			}
		default:
			return {required: false}
	}
}
