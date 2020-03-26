import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import './Form.css';
import Register from './Register.js';
import Search from './Search.js';
import Secret from './Secret.js';

function Form({ id, show, onClose }) {

    function handleFormType() {
        if (id === "search")
            return <Search key="searchForm"></Search>
        else if (id === "newItem")
            return <Register key="registerForm"></Register>
        else
            return <Secret key="secretForm"></Secret>
    }

    if (!show)
        return null;

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <div>
            <Dialog fullScreen open={show} onClose={onClose} TransitionComponent={Transition}>
                <AppBar className="appBar">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        </IconButton>
                        <Typography variant="h6" className="title">
                            Bunker
                            </Typography>
                        <Button
                            color="inherit"
                            onClick={onClose}
                            startIcon={<CloseIcon></CloseIcon>}>
                            cancel
                            </Button>
                    </Toolbar>
                </AppBar>
                <div key="formType" className="form">
                    {handleFormType()}
                </div>
            </Dialog>
        </div>
    );
}


Form.propTypes = {
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string,
};

export default Form;