import React from 'react';
import './Navbar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className="" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="title">
                    Bunker
                    </Typography>
            </Toolbar>
        </AppBar>
    )
}