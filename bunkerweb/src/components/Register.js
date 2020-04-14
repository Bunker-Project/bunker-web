import React from 'react';
import './Register.css';
import Api from '../Api';
import { v4 as uuidv4 } from 'uuid';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../global.css';
import Chip from './Chip';
import { useHistory } from 'react-router-dom';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chips: [],
            title: '',
            description: '',
            isErrorTitle: false,
            isErrorDescription: false,
            errorTitleText: '',
            errorDescText: '',
            openSnackBar: false,
            message: '',
            messageType: 'info'
        };
    }

    async save() {
        var _api;
        let newId = uuidv4();//Creates a random GUID as PK
        if (this.validate()) {
            _api = new Api({ isDev: true });

            var keys = [];
            for (var key of this.state.chips) {
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
                    title: this.state.title,
                    description: this.state.description,
                    keyWords: keys
                }
            });

            this.configureAfterSave(response);
        }
    }

    validate() {
        let validated = true;

        if (this.state.title.length === 0) {
            this.setState({
                isErrorTitle: true,
                errorTitleText: 'The title must have a value'
            });
            validated = false;
        } else {
            this.setState({
                isErrorTitle: false,
                errorTitleText: ''
            });
        }

        if (this.state.description.length === 0) {
            this.setState({
                isErrorDescription: true,
                errorDescText: 'The description must have a value'
            });
            validated = false;
        } else {
            this.setState({
                isErrorDescription: false,
                errorDescText: ''
            });
        }

        return validated;
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.setState({
                chips: [...this.state.chips, {
                    id: uuidv4(),
                    description: e.target.value
                }]
            });
            e.target.value = "";
        }
    }


    handleDelete = (data) => {
        this.setState({
            chips: this.state.chips.filter(chip => chip.id !== data.id)
        });
    };

    openSnackBar = (message, messageType) => {
        this.setState({
            openSnackBar: true,
            message: message,
            messageType: messageType
        });
    };

    closeSnackBar = () => {
        this.setState({
            openSnackBar: false
        });
    };

    configureAfterSave = (response) => {
        if (response.status === 201)
            this.openSnackBar("Created successfully", "success");
        else
            this.openSnackBar(response.statusText, "error");

        this.setState({
            title: '',
            description: '',
            chips: []
        });

        document.getElementById("txtTitle").focus();
    };

    enterWasPressed = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.save();
        }
    }

    returnToHome = () => {
        console.log('Its here');
        const history = useHistory();
        history.push('/');
    }

    render() {

        return (
            <div className="container">
                {/* <div className="inputs">
                    <TextField
                        id="txtTitle"
                        label="Title"
                        style={{ margin: 8 }}
                        placeholder="Type the title"
                        helperText={this.state.errorTitleText}
                        fullWidth
                        margin="normal"
                        autoFocus={true}
                        error={this.state.isErrorTitle}
                        onChange={e => this.setState({ title: e.target.value })}
                        value={this.state.title}
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
                        onKeyDown={this.handleKeyDown}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="chips">
                    {this.state.chips.map(data => {
                        return (
                            <Chip
                                key={data.id}
                                label={data.description}
                                onDelete={() => this.handleDelete(data)}
                                variant="outlined"
                                color="primary"
                                className="chipItem"
                            />
                        );
                    })}
                </div>
                <div className="description">
                    <TextField
                        id="txtDescription"
                        label="What do you want to keep here?"
                        placeholder="Type something, feel free :). I'll keep the secret"
                        multiline
                        fullWidth
                        rows="4"
                        value={this.state.description}
                        variant="outlined"
                        onChange={e => this.setState({ description: e.target.value })}
                        helperText={this.state.errorDescText}
                        error={this.state.isErrorDescription}
                        onKeyDown={this.enterWasPressed}
                    />
                </div>
                <div className="save">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.save()}
                        startIcon={<CheckIcon></CheckIcon>}>
                        Save
                    </Button>
                </div> */}
                <label
                    htmlFor="txtTitle"
                    className="label"> Title:</label>
                <input
                    type="text"
                    id="txtTitle"
                    className="defaultTextBox"
                    placeholder="Type the title"
                    autoFocus
                    onChange={e => this.setState({ title: e.target.value })}
                    value={this.state.title}></input>

                <label
                    id="labelKeyword"
                    htmlFor="txtKeyword"
                    className="label"> Keywords:</label>
                <input
                    type="text"
                    id="txtKeyword"
                    className="defaultTextBox"
                    placeholder="Type and press enter to create a keyword"
                    onKeyDown={this.handleKeyDown}
                    value={this.state.description}
                    onChange={e => this.setState({ description: e.target.value })}></input>

                <div className="chips">
                    {this.state.chips.map(data => {
                        return (
                            <Chip
                                key={data.id}
                                label={data.description}
                                onDelete={() => this.handleDelete(data)}
                            />
                        );
                    })}
                </div>

                <label
                    id="labelContent"
                    htmlFor="txtContent"
                    className="label">Content: </label>
                <textarea
                    id="txtContent"
                    rows="5"
                    cols="30"
                    placeholder="What do you want to keep here?"
                    onKeyDown={this.enterWasPressed}>
                </textarea>

                <div className="buttons">
                    <button
                        className="saveButton"
                        onClick={() => this.save()}>SAVE
                    </button>
                    <button
                        className="backButton"
                        onClick={() => this.returnToHome()}>BACK
                    </button>
                </div>

                <SnackBar
                    open={this.state.openSnackBar}
                    onClose={this.closeSnackBar}
                    autoHideDuration={2000}>
                    <MuiAlert elevation={6} variant="filled" severity={this.state.messageType}>
                        {this.state.message}
                    </MuiAlert>
                </SnackBar>
            </div>
        );
    }
}

export default Register;