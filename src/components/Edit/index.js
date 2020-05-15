import React, { useState, useEffect } from 'react';
import Chip from '../Chip';
import Button from '@material-ui/core/Button';
import Api from '../../Api';
import '../Register/Register.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';

// class Edit extends React.Component {
function Edit({ location }) {

    const history = useHistory();
    const item = location.state;

    const [isErrorTitle, setErrorTitle] = useState(false);
    const [isErrorDescription, setErrorDescription] = useState(false);
    const [errorTitleText, setErrorTitleText] = useState('');
    const [errorDescText, setErrorDescText] = useState('');
    
    const [chips, setChips] = useState(location.state.keyWords);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [updateHasError, setUpdateHasError] = useState(false);
    const [updateErrorMessage, setUpdateErrorMessage] = useState('');


    //If you pass something to the array it will execute every time something change otherwise just once

    useEffect(() => {
        initialize();
    }, []);


    async function save() {
        var _api;
        if (validate()) {
            _api = new Api({ isDev: true });

            var keys = [];
            for (var key of item.keyWords) {
                keys.push({
                    id: key.id,
                    description: key.description,
                    itemId: item.id
                });
            }

            let response = await _api.update({
                api: "items",
                data: {
                    id: item.id,
                    title: title,
                    description: description,
                    keyWords: keys
                }
            });

            if (response == null || response.status !== 200) {
                setUpdateHasError(true);
                setUpdateErrorMessage("It wasn't possible to update. Check the internet connection");

            } else {
                history.goBack();
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

    function returnToSearch() {
        setOpen(false);
        history.goBack();
    }

    //Returns the chips in case of the aren't null
    function getChips() {

        if (item.keyWords !== null || item.keyWords !== undefined) {
            return (
                item.keyWords.map(data => {
                    return (
                        <Chip
                            key={data.id}
                            label={data.description}
                            onDelete={() => handleDelete(data)}
                        />
                    );
                })
            );
        }
    }

    function enterWasPressed(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            save();
        }
    }

    return (
        <div className="registerContainer">
            <Helmet>
                <title>Items / Bunker</title>
            </Helmet>
            <label
                htmlFor="txtTitle"
                className="label"> Title:</label>
            <input
                type="text"
                id="txtTitle"
                className={isErrorTitle ? "defaultTextBoxError" : "defaultTextBox"}
                placeholder="Type the title"
                autoFocus
                onChange={e => setTitle(e.target.value)}
                value={title}></input>
            <label
                className={isErrorTitle ? "showLabelError" : "labelError"}>
                {errorTitleText}
            </label>

            <label
                id="labelKeyword"
                htmlFor="txtKeyword"
                className="label"> Keywords:</label>
            <input
                type="text"
                id="txtKeyword"
                className="defaultTextBox"
                placeholder="Type and press enter to create a keyword"
                onKeyDown={handleKeyDown}
                value={keyword}
                onChange={e => setKeyword(e.target.value)}

            ></input>

            <div className="chips">
                {getChips()}
            </div>

            <label
                id="labelContent"
                htmlFor="txtDescription"
                className="label">Content: </label>
            <textarea
                id="txtDescription"
                rows="5"
                cols="30"
                className={isErrorDescription ? "textboxMultilineError" : "textboxMultiline"}
                placeholder="What do you want to keep here?"
                onKeyDown={enterWasPressed}
                value={description}
                onChange={e => setDescription(e.target.value)}>
            </textarea>
            <label
                className={isErrorDescription ? "showLabelError" : "labelError"}>
                {errorDescText}
            </label>

            <div className="buttons">
                <button
                    className="saveButton"
                    onClick={() => save()}>SAVE
                    </button>
                <button
                    className="backButton"
                    onClick={() => setOpen(true)}>CANCEL
                    </button>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
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
                    <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                        No
                    </Button>
                    <Button onClick={() => returnToSearch()} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <SnackBar
                open={updateHasError}
                onClose={() => setUpdateHasError(false)}
                autoHideDuration={6000}>
                <MuiAlert elevation={6} variant="filled" severity="error">
                    {updateErrorMessage}
                </MuiAlert>
            </SnackBar>
        </div>
    );
}

export default Edit;