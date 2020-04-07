import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Api from '../Api';
import DeleteIcon from '@material-ui/icons/Delete';
import './Edit.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

// class Edit extends React.Component {
function Edit(props) {

    const history = useHistory();

    const [isErrorTitle, setErrorTitle] = useState(false);
    const [isErrorDescription, setErrorDescription] = useState(false);
    const [errorTitleText, setErrorTitleText] = useState('');
    const [errorDescText, setErrorDescText] = useState('');
    const [item, setItem] = useState(props.location.state);
    const [chips, setChips] = useState(props.location.state.keyWords);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);

    //If you pass something to the array it will execute every time something change otherwise just once

    useEffect(() => {
        initialize();
    }, []);


    async function save() {
        var _api;
        if (validate()) {
            _api = new Api({ isDev: true });
            //First tries to insert the items, if successful then inserts the keywords
            let response = await _api.update({
                api: "items",
                data: {
                    id: item.id,
                    title: title,
                    description: description
                }
            });

            if (response.status === 201) {
                var keys = [];
                console.log(this);
                for (var key of item.keyWords) {
                    keys.push({
                        id: key.id,
                        description: key.description,
                        itemId: item.id
                    });
                }

                _api.update({
                    api: 'keywords',
                    data: keys
                });
            }
        }
    }


    function validate() {
        let validated = true;


        if (title.length === 0) {
            setErrorTitle(true);
            setErrorTitleText('The title must have a value');

            validated = false;
        } else {
            setErrorTitle(false);
            setErrorTitleText('');
        }

        if (description.length === 0) {
            setErrorDescription(true);
            setErrorDescText('The description must have a value');
            validated = false;
        } else {
            setErrorDescription(false);
            setErrorDescText('');
        }

        return validated;
    }

    function updateTitle(event) {
        setTitle(event.target.value);
    }

    function updateDescription(event) {
        setDescription(event.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setChips(...chips, e.target.value);
            e.target.value = "";
        }
    }

    function handleDelete(data) {
        setChips(chips.filter(chip => chip.id !== data.id));
    }

    function initialize() {
        setTitle(item.title);
        setDescription(item.description);
    }

    function openDialog() {
        setOpen(true);
    }

    function closeDialog() {
        setOpen(false);
    }

    function redirectToMain() {
        closeDialog();
        history.push('/');
    }

    return (
        <div className="container">
            <TextField
                id="txtTitle"
                label="Title"
                style={{ margin: 8 }}
                placeholder="Type the title"
                helperText={errorTitleText}
                fullWidth
                margin="normal"
                error={isErrorTitle}
                onChange={updateTitle}
                value={title}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                id="txtKeyword"
                label="Keywords"
                style={{ margin: 8 }}
                placeholder="Type and press enter to create a keyword"
                fullWidth
                margin="normal"
                onKeyDown={handleKeyDown}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <div className="chips">
                {item.keyWords.map(data => {
                    return (
                        <Chip
                            key={data.id}
                            label={data.description}
                            onDelete={() => handleDelete(data)}
                            variant="outlined"
                            color="primary"
                            className="chipItem"
                        />
                    );
                })}
            </div>
            <TextField
                id="txtDescription"
                label="What do you want to keep here?"
                placeholder="Type something, feel free :). I'll keep the secret"
                multiline
                rows="4"
                value={description}
                variant="outlined"
                onChange={updateDescription}
                helperText={errorDescText}
                error={isErrorDescription}
            />
            <div className="save">
                <Button
                    key="saveButton"
                    variant="outlined"
                    color="primary"
                    onClick={() => save()}
                    startIcon={<CheckIcon></CheckIcon>}>
                    update
                    </Button>
                <Button
                    key="cancelButton"
                    variant="outlined"
                    color="secondary"
                    onClick={() => openDialog()}
                    startIcon={<DeleteIcon />}>
                    cancel
                    </Button>
            </div>

            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The changes made will not be saved, are you sure that you want to cancel?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary" autoFocus>
                        No
                    </Button>
                    <Button onClick={redirectToMain} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Edit;