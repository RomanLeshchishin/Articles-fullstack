import Select from "react-select";

interface SelectTopicProps {
	valueTopic: any,
	onChangeTopic: any
}

const SelectTopic = ({ valueTopic, onChangeTopic } : SelectTopicProps) => {
	const topicOptions = [
		{value: 'Разработка', label: 'Разработка'},
		{value: 'Дизайн', label: 'Дизайн'},
		{value: 'Маркетинг', label: 'Маркетинг'},
		{value: 'Менеджмент', label: 'Менеджмент'},
		{value: 'Научпоп', label: 'Научпоп'},
	]
	const defaultLabelTopic = {value: 'default', label: 'Выберите тематику'}

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			width: '347px',
			height: '45px',
			backgroundColor: 'white',
			border: '3px solid #51A1FF',
			borderRadius: '34px',
			color: 'black',
			fontWeight: 400,
			fontSize: 16,
			fontFamily: 'Inter, sans-serif',
			fontStyle: 'normal',
			lineHeight: '20px',
			'&:hover':{
				cursor: 'pointer'
			}
		}),
		option: (provided: any) => ({
			...provided,
			color: 'black',
			fontWeight: 400,
		}),
		dropdownIndicator: (provided: any) => ({
			...provided,
			color: 'black',
			'&:hover':{
				color: 'black'
			}
		}),
		indicatorSeparator: (provided: any) => ({
			...provided,
			display: 'none'
		})
	};

	const customTheme = (theme: any) => ({
		...theme,
		colors: {
			...theme.colors,
			primary25: "#afd5f9",
			primary: "#72b6f5",
		},
	});
	return (
		<Select
			options={topicOptions}
			styles={customStyles}
			defaultValue={defaultLabelTopic}
			theme={customTheme}
			isSearchable={false}
			value={valueTopic}
			onChange={onChangeTopic}
		/>
	);
};

export default SelectTopic;
