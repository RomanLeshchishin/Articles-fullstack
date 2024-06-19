import styles from './avatar-editor.module.css';
import { Button, Icon } from '@gravity-ui/uikit';
import { Pencil } from '@gravity-ui/icons';
import PersonIcon from '@gravity-ui/icons/svgs/person.svg';
import { useState } from 'react';
import ImageUpload from '@/components/General/ImageUpload/ImageUpload';
import ModalWindow from '@/components/Modals/ModalWindow/ModalWindow';

type AvatarEditorProps = {
	imageUrl?: string;
	saveImageUrl: (url: string) => void;
};

export default function AvatarEditor({ imageUrl, saveImageUrl }: AvatarEditorProps) {
	const [updatedImageUrl, setUpdatedImageUrl] = useState(imageUrl)
	const [editButtonOpacity, setEditButtonOpacity] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSave = () => {
		if (updatedImageUrl) {
			saveImageUrl(updatedImageUrl)
			setIsModalOpen(false)
		}
	}

	return (
		<div
			className={styles.imageContainer}
			onMouseEnter={() => setEditButtonOpacity(1)}
			onMouseLeave={() => setEditButtonOpacity(0)}
		>
			<ModalWindow open={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ImageUpload setImage={setUpdatedImageUrl} image={updatedImageUrl} />
				<Button view={'flat-info'} selected onClick={handleSave}>Сохранить</Button>
			</ModalWindow>
			<Button
				selected
				view={'flat-info'}
				pin={'round-round'}
				className={styles.editButton}
				style={{ opacity: editButtonOpacity, top: '5px', left: '50%', position: 'absolute',
					transform: 'translateX(-50%)' }}
				onClick={() => setIsModalOpen(true)}
			>
				<Icon data={Pencil} />
			</Button>

			{imageUrl ? (
				<img src={imageUrl} alt={'Аватар'} className={styles.avatar} />
			) : (
				<img src={PersonIcon.src} alt={'Аватар'} width={200} height={200} />
			)}
		</div>
	);
}
