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

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.show,
        };
        
        this.handleClose = this.handleClose.bind(this);

    }

    //This is one way to create but we need to bind it in the constructor
    handleClose() {
        this.setState({ open: false });
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleFormType() {
        if (this.props.id === "search")
            return <Search></Search>
        else if (this.props.id === "newItem")
            return <Register></Register>
        else
            return <Secret></Secret>
            
    }

    render() {

        if (!this.props.show)
            return null;

            const Transition = React.forwardRef(function Transition(props, ref) {
                return <Slide direction="up" ref={ref} {...props} />;
            });

            return (
                <div>
                    <Dialog fullScreen open={this.props.show} onClose={this.props.onClose} TransitionComponent={Transition}>
                        <AppBar className="appBar">
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={this.props.onClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className="title">
                                    Sound
                            </Typography>
                                <Button autoFocus color="inherit" onClick={this.props.onClose}>
                                    save
                            </Button>
                            </Toolbar>
                        </AppBar>
                        <div className="form">
                            {this.handleFormType()}
                        </div>
                    </Dialog>
                </div>
            );
        }
    }

    Form.propTypes = {
        onClose: PropTypes.func.isRequired,
        id: PropTypes.string,
    };

    export default Form;