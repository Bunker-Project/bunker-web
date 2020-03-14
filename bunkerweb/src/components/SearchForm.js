import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import './SearchForm.css';

class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.show
        };
        console.log("The search form was opened");
        this.handleClose = this.handleClose.bind(this);

    }

    //This is one way to create but we need to bind it in the constructor
    handleClose() {
        this.setState({ open: false });
    }

    handleOpen() {
        this.setState({ open: true });
        console.log("setting");
    }

    render() {

        if (!this.props.show) {
            return null;
        } 

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
                    {/* <List className="list">
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List> */}
                </Dialog>
            </div>
        );
    }
}

SearchForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SearchForm;