import Select from "react-select";

interface SelectTagProps {
	valueTags: any,
	onChangeTags: any
}

const SelectTag = ({ valueTags, onChangeTags } : SelectTagProps) => {
	const tagOptions = [
		{value: 'React', label: 'React'},
		{value: 'Nest', label: 'Nest'},
		{value: 'Figma', label: 'Figma'},
		{value: 'UX/UI', label: 'UX/UI'},
		{value: 'Персонализация', label: 'Персонализация'},
		{value: 'КонтентМаркетинг', label: 'КонтентМаркетинг'},
		{value: 'Лидерство', label: 'Лидерство'},
		{value: 'Управление проектами', label: 'Управление проектами'},
		{value: 'Популяризация науки', label: 'Популяризация науки'},
		{value: 'Научные открытия', label: 'Научные открытия'}
	]
	const defaultLabelTag = {value: 'default', label: 'Выберите теги'}

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
		placeholder: (provided: any) => ({
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
			options={tagOptions}
			styles={customStyles}
			placeholder={'Выберите теги'}
			theme={customTheme}
			isMulti={true}
			isSearchable={true}
			value={valueTags}
			onChange={onChangeTags}
		/>
	);
};

export default SelectTag;
