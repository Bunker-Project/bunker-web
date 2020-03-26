import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Register.css';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Api from '../Api';
import { v4 as uuidv4 } from 'uuid'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chips: [],
            txtTitle: '',
            txtDescription: '',
            isErrorTitle: false,
            isErrorDescription: false,
            errorTitleText: '',
            errorDescText: ''
        }
    }

    async save() {
        var _api;
        let newId = uuidv4();//Creates a random GUID as PK
        if (this.validate()) {
            _api = new Api({ isDev: true });
            
            var keys = [];
                for (var key of this.state.chips) {
                    keys.push({
                        id: uuidv4(),
                        description: key,
                        itemId: newId
                    });
                }

            let response = await _api.insert({
                api: "items",
                data: {
                    id: newId,
                    title: this.state.txtTitle,
                    description: this.state.txtDescription,
                    keyWords: keys
                }
            })

            console.log(response);
        }
    }

    validate() {
        let validated = true;

        if (this.state.txtTitle.length === 0) {
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

        if (this.state.txtDescription.length === 0) {
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

    updateVariables = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.setState({
                chips: [...this.state.chips, e.target.value]
            });
            e.target.value = "";
        }
    }

    handleDelete = (data) => {
        this.setState({
            chips: this.state.chips.filter(chip => chip !== data)
        });
    }


    render() {

        return (
            <div className="container">
                <TextField
                    id="txtTitle"
                    label="Title"
                    style={{ margin: 8 }}
                    placeholder="Type the title"
                    helperText={this.state.errorTitleText}
                    fullWidth
                    margin="normal"
                    error={this.state.isErrorTitle}
                    onChange={this.updateVariables}
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
                <div className="chips">
                    {this.state.chips.map(data => {
                        return (
                            <Chip
                                key={data}
                                label={data}
                                onDelete={() => this.handleDelete(data)}
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
                    value={this.state.description}
                    variant="outlined"
                    onChange={this.updateVariables}
                    helperText={this.state.errorDescText}
                    error={this.state.isErrorDescription}
                />
                <div className="save">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.save()}
                        startIcon={<CheckIcon></CheckIcon>}>
                        Save
                    </Button>
                </div>
            </div>
        );
    }
}

export default Register;