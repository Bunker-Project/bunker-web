import React, { useState } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SearchIcon from '@material-ui/icons/Search';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './Fab.css'
import { useHistory } from 'react-router-dom';

function Fab(props) {

    const history = useHistory();
    const direction = 'right';
    const [open, setOpen] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
    }

    function handleClick(idClicked) {
        switch (idClicked) {
            case "search":
                history.push('/search');
                break;
            case "register":
                history.push('/register');
                break;
            case "secret":
                history.push('/secret');
                break;
            default:
                break;
        }
    }

    const actions = [
        { icon: <SearchIcon />, name: 'Search', id: 'search' },
        { icon: <SpeakerNotesIcon />, name: "Add new item", id: 'register' },
        { icon: <VpnKeyIcon />, name: "Add new secret", id: 'secret' },
    ];

    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className="speedDial"
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={direction}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleClick(action.id)}
                    />
                ))}
            </SpeedDial>
            {/* <Form show={showForm} onClose={handleCloseForm} id={id}></Form> */}
        </div>
    );
};


export default Fab;