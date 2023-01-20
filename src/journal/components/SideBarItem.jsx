import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {
	const dispatch = useDispatch();
	const { notes } = useSelector(state => state.journal);

	const newTitle = useMemo(() => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	}, [title])

	const onActiveNote = () => {
		dispatch(setActiveNote({ title, body, id, date, imageUrls }))
	}
	return (
		<ListItem disablePadding onClick={onActiveNote} id={id}>
			<ListItemButton >
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container    >
					<ListItemText key={id} primary={newTitle} />
					<ListItemText key={`${id}+"2"`} secondary={body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	)
}
