import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Api from '../Api';
import DeleteIcon from '@material-ui/icons/Delete';
import './Edit.css';

class Edit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isErrorTitle: false,
            isErrorDescription: false,
            errorTitleText: '',
            errorDescText: '',
            item: props.location.state,
            title: '',
            description: ''
        }
    }

    componentDidMount(){
        this.initialize();
    }

    save() {
        var _api;
        if (this.validate()) {
            _api = new Api({ isDev: true });
            //First tries to insert the items, if successful then inserts the keywords
            _api.update({
                api: "items",
                data: {
                    id: this.state.item.id,
                    title: this.state.title,
                    description: this.state.description
                }
            }).then(data =>{
                    if (data.status === 201) {
                        var keys = [];
                        console.log(this);
                        for (var key of this.state.item.keyWords) {
                            keys.push({
                                id: key.id,
                                description: key.description,
                                itemId: this.state.item.id
                            });
                        }

                        _api.update({
                            api: 'keywords',
                            data: keys
                        });
                    }
                }
            );
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

    updateTitle = event => {
        this.setState({
            title: event.target.value,
        });
    }

    updateDescription = event => {
        this.setState({
            description: event.target.value
        })
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

    initialize = () => {
        this.setState({
            title: this.state.item.title,
            description: this.state.item.description
        })
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
                    onChange={this.updateTitle}
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
                    {this.state.item.keyWords.map(data => {
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
                <TextField
                    id="txtDescription"
                    label="What do you want to keep here?"
                    placeholder="Type something, feel free :). I'll keep the secret"
                    multiline
                    rows="4"
                    value={this.state.description}
                    variant="outlined"
                    onChange={this.updateDescription}
                    helperText={this.state.errorDescText}
                    error={this.state.isErrorDescription}
                />
                <div className="save">
                    <Button
                        key="saveButton"
                        variant="outlined"
                        color="primary"
                        onClick={() => this.save()}
                        startIcon={<CheckIcon></CheckIcon>}>
                        update
                    </Button>
                    <Button
                        key="cancelButton"
                        variant="outlined"
                        color="secondary"
                        onClick={() => this.save()}
                        startIcon={<DeleteIcon />}>
                        cancel
                    </Button>
                </div>
            </div>
        );
    }
}

export default Edit;