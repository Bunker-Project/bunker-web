import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import './Form.css';
import Register from './Register.js';
import Search from './Search.js';
import Secret from './Secret.js';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory } from 'react-router-dom';

function Form(props) {

    const history = useHistory();

    function handleFormType() {
        
        if (props.id === "search")
            return <Search key="searchForm"></Search>
        else if (props.id === "register")
            return <Register key="registerForm"></Register>
        else
            return <Secret key="secretForm"></Secret>
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <div>
            <Dialog fullScreen open={true} onClose={props.onClose} TransitionComponent={Transition}>
                <AppBar className="appBar">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
                        </IconButton>
                        <Typography variant="h6" className="title">
                            Bunker
                            </Typography>
                        <IconButton
                            color="inherit"
                            onClick={() => history.push('/')}>
                            <ArrowBackIosOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div key="formType" className="form">
                    {handleFormType()}
                </div>
            </Dialog>
        </div>
    );
}

export default Form;