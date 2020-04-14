import React from 'react';
import { useState } from 'react';
import './Register.css';
import Api from '../Api';
import { v4 as uuidv4 } from 'uuid';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../global.css';
import Chip from './Chip';
import { useHistory } from 'react-router-dom';


// class Register extends React.Component {
function Register(props) {

    const history = useHistory();
    const _api = new Api({ isDev: true });
    const [chips, setChips] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isErrorTitle, setTitleHasError] = useState(false);
    const [isErrorDescription, setDescriptionHasError] = useState(false);
    const [errorTitleText, setErrorTitleText] = useState('');
    const [errorDescText, setErrorDescText] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info');
    const [keyword, setKeyword] = useState('');
    

    async function save() {
        let newId = uuidv4();//Creates a random GUID as PK
        if (validate()) {
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

    function validate() {
        let validated = true;

        if (title.length === 0) {
            setTitleHasError(true);
            setErrorTitleText('The title must have a value');
            validated = false;
        } else {
            setTitleHasError(false);
            setErrorTitleText('');
        }

        if (description.length === 0) {
            setDescriptionHasError(true);
            setErrorDescText('The description must have a value')
            validated = false;
        } else {
            setDescriptionHasError(false);
            setErrorDescText('');
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

    function enterWasPressed(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            save();
        }
    }

    function returnToHome() {
        history.push('/');
    }

    return (
        <div className="container">
          
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
                onChange={e => setKeyword(e.target.value)}></input>

            <div className="chips" tabIndex="-1">
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
                    onClick={() => returnToHome()}>BACK
                    </button>
            </div>

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