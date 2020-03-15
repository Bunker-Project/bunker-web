import React from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SearchIcon from '@material-ui/icons/Search';
import Form from './Form.js';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './Fab.css'

class Fab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            direction: 'right',
            open: false,
            hidden: false,
            showForm: false,
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClick = (id) => {
        this.setState({ showForm: true }, () => {
            console.log("The status was updated to : " + this.state.showForm);
        });
        
        console.log(id);
    }

    handleCloseForm = () => {
        console.log("Closing");
        this.setState({ showForm: false });
    }

    render() {
        const actions = [
            { icon: <SearchIcon />, name: 'Search', id: 'search' },
            { icon: <SpeakerNotesIcon />, name: "Add new item", id: 'newItem' },
            { icon: <VpnKeyIcon />, name: "Add password", id: 'newPassword' },
        ];

        return (
            <div>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className="speedDial"
                    hidden={this.state.hidden}
                    icon={<SpeedDialIcon />}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    open={this.state.open}
                    direction={this.state.direction}
                >
                    {actions.map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => this.handleClick(action.id)}
                        />
                    ))}
                </SpeedDial>
                <Form show={this.state.showForm} onClose={this.handleCloseForm}></Form>
            </div>
        );
    };
}

export default Fab;