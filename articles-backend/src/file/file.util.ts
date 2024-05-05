export const getContentType = (filename: string) => {
	const type = filename.split('.')[1]
	if(type === 'webp' || type === 'svg') {
		return 'image'
	}
	if(type === 'pdf') {
		return 'application/pdf'
	}
	return ''
}
