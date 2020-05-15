import React, { useRef } from 'react';
import { useState } from 'react';
import './Register.css';
import Api from '../../Api';
import { v4 as uuidv4 } from 'uuid';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../../global.css';
import Chip from '../Chip';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../Input';
import { Form } from '@unform/web';
import { Helmet } from 'react-helmet';

// class Register extends React.Component {
function Register(props) {

    const history = useHistory();
    const _api = new Api({ isDev: true });
    const formRef = useRef(null);

    const [chips, setChips] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isErrorDescription, setDescriptionHasError] = useState(false);
    const [errorDescText, setErrorDescText] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');
    const [keyword, setKeyword] = useState('');

    const schema = Yup.object().shape({
        title: Yup.string().required('Title is required')
    });

    async function save(item) {
        let newId = uuidv4();//Creates a random GUID as PK

        if (await validate(item)) {
            var keys = [];
            for (var key of chips) {
                keys.push({
                    id: key.id,
                    description: key.description,
                    itemId: newId
                });
            }

            let response = await _api.insert({
                api: "items",
                data: {
                    id: newId,
                    title: title,
                    description: description,
                    keyWords: keys
                }
            });

            configureAfterSave(response);
        }
    }

    async function validate(item) {
        let validated = true;
        try {

            formRef.current.setErrors({});

            if (description.length === 0) {
                setDescriptionHasError(true);
                setErrorDescText('The description must have a value')
                validated = false;
            } else {
                setDescriptionHasError(false);
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
    };

    function openSnackBar(message, messageType) {
        setOpen(true);
        setMessage(message);
        setMessageType(messageType);
    };


    function configureAfterSave(response) {
        if (response.status === 201)
            openSnackBar("Created successfully", "success");
        else
            openSnackBar(response.statusText, "error");

        setTitle('');
        setDescription('');
        setChips([]);

        document.getElementById("txtTitle").focus();
    };

    function returnToHome() {
        history.push('/');
    }

    async function submitItem(item) {
        await save(item);
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
                        id="labelKeyword"
                        htmlFor="txtKeyword"
                        className="label"> Keywords:</label>
                    <input
                        id="txtKeyword"
                        placeholder="Type and press enter to create a keyword"
                        aria-placeholder="To insert a keyword, type what you want and press enter. Keywords are used to find and identify easily your item"
                        onKeyDown={handleKeyDown}
                        className="defaultTextBox"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}></input>

                    <div className="chips">
                        {chips.map(data => {
                            return (
                                <Chip
                                    key={data.id}
                                    label={data.description}
                                    onDelete={() => handleDelete(data)}
                                />
                            );
                        })}
                    </div>

                    <label
                        id="labelContent"
                        htmlFor="txtDescription"
                        className="label">Content: </label>
                    <textarea
                        id="txtDescription"
                        rows="5"
                        cols="30"
                        name="description"
                        aria-multiline="true"
                        className={isErrorDescription ? "textboxMultilineError" : "textboxMultiline"}
                        placeholder="What do you want to keep here?"
                        // onKeyDown={enterWasPressed}
                        value={description}
                        onChange={e => setDescription(e.target.value)}>
                    </textarea>
                    <label
                        className={isErrorDescription ? "showLabelError" : "labelError"}>
                        {errorDescText}
                    </label>
                    <div
                        aria-live="polite"
                        aria-label={errorDescText}>
                    </div>

                    <div className="buttons">
                        <button
                            className="saveButton"
                            type="submit">SAVE
                    </button>
                        <button
                            className="backButton"
                            type="button"
                            onClick={() => returnToHome()}>BACK
                    </button>
                    </div>
                </div>
            </Form>

            <SnackBar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}>
                <MuiAlert elevation={6} variant="filled" severity={messageType}>
                    {message}
                </MuiAlert>
            </SnackBar>

        </div>
    );
}

export default Register;