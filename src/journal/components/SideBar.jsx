import React from "react";
import { TurnedInNot } from '@mui/icons-material'
import { Box, List, ListItemText, ListItemButton, ListItemIcon, Grid, Toolbar, Typography, Divider, Drawer } from "@mui/material"

export const SideBar = ({ drawerWidth = 240 }) => {
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open={true}
                sx={{
                    display: { xs: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>Coloso</Typography>
                </Toolbar>
                <Divider />
                <List>
                    {
                        ["Enero", "Febrero", "Marzo", "Abril.", "Mayo", "Junio", "Julio"].map(text => (
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container    >
                                    <ListItemText key={text} primary={text} />
                                    <ListItemText key={text.length * 2} secondary={"lorem asjkldjlas daskjdladja"} />
                                </Grid>
                            </ListItemButton>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    );
};
