import React, { useState, useEffect, useRef } from 'react';
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
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '../Input';
import { v4 as uuidv4 } from 'uuid';

// class Edit extends React.Component {
function Edit({ location }) {

    const history = useHistory();
    const item = location.state;
    const formRef = useRef(null);

    const [isErrorTitle, setErrorTitle] = useState(false);
    const [isErrorDescription, setErrorDescription] = useState(false);
    const [errorTitleText, setErrorTitleText] = useState('');
    const [errorDescText, setErrorDescText] = useState('');

    const [chips, setChips] = useState(location.state.keyWords);
    // const [chips, setChips] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [updateHasError, setUpdateHasError] = useState(false);
    const [updateErrorMessage, setUpdateErrorMessage] = useState('');

    const schema = Yup.object().shape({
        title: Yup.string().required('Title is required')
    });

    //If you pass something to the array it will execute every time something change otherwise just once
    useEffect(() => {
        initialize();
        
    }, []);


    async function save(data) {
        var _api;
        if (await validate(data)) {
            _api = new Api();

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

    async function validate(item) {
        let validated = true;
        try {

            formRef.current.setErrors({});

            if (description.length === 0) {
                setErrorDescription(true);
                setErrorDescText('The description must have a value')
                validated = false;
            } else {
                setErrorDescription(false);
                setErrorDescText('');
            }

            await schema.validate(item, {
                abortEarly: false
            });

        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                
                formRef.current.setErrors(validationErrors);
            }
            validated = false;
        }

        return validated;
    }

    function handleKeyDown(e) {
        
        if (e.key === 'Enter') {
            e.preventDefault();
            
            setChips([...chips, {
                id: uuidv4(),
                description: e.target.value
            }]);
            
            setKeyword('');
        }
    }

    function handleDelete(data) {
        setChips(chips.filter(chip => chip.id !== data.id));
        item.keyWords = item.keyWords.filter(chip => chip.id !== data.id);
    }

    function initialize() {
        setTitle(item.title);
        setDescription(item.description);
        setErrorTitle(false);
        setErrorTitleText('');
    }

    function returnToSearch() {
        setOpen(false);
        history.goBack();
    }

    //Returns the chips in case of the aren't null
    function getChips() {

        if (chips !== null || chips !== undefined) {
            return (
                chips.map(data => {
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

    async function submitItem(data) {
        await save(data);
    }

    return (
        <div className="registerContainer">
            <Helmet>
                <title>Items / Bunker</title>
            </Helmet>
            <Form ref={formRef} onSubmit={submitItem}>
                <div className="registerContainer">
                    <label
                        htmlFor="txtTitle"
                        className="label"> Title:</label>
                    <Input
                        id="txtTitle"
                        name="title"
                        placeholder="Type the title"
                        aria-required="true"
                        onChange={e => setTitle(e.target.value)}
                        value={title}>
                    </Input>
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
                        // onKeyDown={enterWasPressed}
                        value={description}
                        onChange={e => setDescription(e.target.value)}>
                    </textarea>
                    <label
                        className={isErrorDescription ? "showLabelError" : "labelError"}
                        data-testid="edit_item_error_description_label">
                        {errorDescText}
                    </label>

                    <div className="buttons">
                        <button
                            className="saveButton"
                            type="submit">SAVE
                    </button>
                        <button
                            className="backButton"
                            onClick={() => setOpen(true)}>CANCEL
                    </button>
                    </div>
                </div>
            </Form>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
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