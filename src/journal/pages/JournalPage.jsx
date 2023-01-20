import { IconButton, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
	const dispatch = useDispatch();
	const { isSaving, active } = useSelector(state => state.journal);
	console.log(isSaving)

	const onClickNewNote = () => {
		dispatch(startNewNote())

	}
	return (
		<JournalLayout>
			{
				active ? <NoteView title={active.title} date={active.date} body={active.body} /> : <NothingSelectedView />
			}

			{/* <NothingSelectedView /> */}

			<IconButton
				onClick={onClickNewNote}
				disabled={isSaving}
				size='large'
				sx={{
					color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
					position: 'fixed',
					right: 50,
					bottom: 50
				}}>
				<AddOutlined sx={{ fontSize: 30 }}></AddOutlined>
			</IconButton>
		</JournalLayout >
	)
}
