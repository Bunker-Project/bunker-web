import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Search.css';
import Chip from '@material-ui/core/Chip';
// import Avatar from '@material-ui/core/Avatar';


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chips: []
        }
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
                    helperText="(Optional)"
                    fullWidth
                    margin="normal"
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
                                    // avatar={<Avatar>D</Avatar>}
                                    className="chipItem"
                                />
                            );
                        })}
                </div>


            </div>
        );
    }
}

export default Search;