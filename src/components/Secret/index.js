import React, { useState, useEffect, useRef } from 'react';
import './Secret.css';
import Api from '../../Api';
import { v4 as uuidv4 } from 'uuid'
import '../../global.css';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import Input from '../Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';

// class Secret extends React.Component {
function Secret({location}) {

    const api = new Api();
    const history = useHistory();
    const isEditing = location.state.isEditing;
    const formRef = useRef(null);

    const [id, setId] = useState('');
    const [txtId, setTxtId] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');

    const schema = Yup.object().shape({
        secretId: Yup.string().required('The ID is required'),
        passwordAsString: Yup.string().required('The password is required')
    });

    async function submitSecret(secret) {
        try {
            formRef.current.setErrors({});

            await schema.validate(secret, {
                abortEarly: false
            })

            await save();

        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });

                formRef.current.setErrors(validationErrors);
            }
        }
    }

    useEffect(() => {
        if (isEditing) {
            
            let secret = location.state.secret;
            setTxtId(secret.secretId);
            setTxtPassword(secret.password);
            setId(secret.id);
        }

    }, [isEditing, location.state.secret])

    async function save() {
        if (isEditing)
            await callUpdate();
        else
            await callInsert();
    }

    async function callUpdate() {
        let response = await api.update({
            api: "secrets",
            data: {
                id: id,
                secretId: txtId,
                passwordAsString: txtPassword
            }
        });
        if (response.status === 201) {
            clearAllData();
            openMessage('Secret updated successfully', 'success');
        } else {
            openMessage(response.statusText, 'error');
        }

        history.push('/search');
    }

    async function callInsert() {
        
        let response = await api.insert({
            api: "secrets",
            data: {
                id: uuidv4(),
                secretId: txtId,
                passwordAsString: txtPassword
            }
        });

        if (response.status === 201) {
            clearAllData();
            openMessage('Secret created successfully', 'success');
        } else {
            openMessage("It wasn't possible to update. Check the internet connection", 'error');
        }

        document.getElementById("txtId").focus();
    }

    function clearAllData() {
        setTxtId('');
        setTxtPassword('');
    }

    function closeMessage() {
        setOpen(false);
    }

    function openMessage(message, messageType) {
        setMessage(message);
        setMessageType(messageType);
        setOpen(true);
    }

    function returnToHome() {
        if (isEditing)
            history.push('/search');
        else
            history.push('/');
    }

    return (
        <div className="secretContainer">
            <Helmet>
                <title>
                    Secrets / Bunker</title>
            </Helmet>
            <Form ref={formRef} onSubmit={submitSecret}>
                <div className="secretContainer">
                    <label
                        htmlFor="txtId"
                        className="label"> Your ID:</label>
                    <Input
                        id="txtId"
                        name="secretId"
                        value={txtId}
                        onChange={e => setTxtId(e.target.value)}
                        placeholder="Type an ID to identify your key in the future"></Input>

                    <label
                        id="labelPassword"
                        htmlFor="txtPassword"
                        className="label"> Your password:</label>
                    <Input
                        id="txtPassword"
                        name="passwordAsString"
                        isPassword={true}
                        value={txtPassword}
                        onChange={e => setTxtPassword(e.target.value)}
                        placeholder="Type the password you want"></Input>

                    <div className="buttons">
                        <button
                            className="saveButton"
                            type="submit">
                            SAVE
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
                onClose={() => closeMessage()}
                autoHideDuration={2000}>
                <MuiAlert elevation={6} variant="filled" severity={messageType}>
                    {message}
                </MuiAlert>
            </SnackBar>
        </div>
    );
}


export default Secret;