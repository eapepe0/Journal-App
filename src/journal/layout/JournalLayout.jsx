import React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { NavBar, SideBar } from '../components'



export const JournalLayout = ({ children }) => {
    const drawerWidth = 280;
    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar drawerWidth={drawerWidth} />

            <SideBar drawerWidth={drawerWidth} />
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}
