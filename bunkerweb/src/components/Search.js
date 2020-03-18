import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Search.css';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Api from '../Api';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        };
    }

    handleClick = () => {
        console.log('Clicked');
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            var api = new Api({ isDev: true });
            api.search({
                api: "items",
                searchString: event.target.value
            }).then(response => {
                this.setState({
                    searchResult: [...this.state.searchResult, response.data]
                });
            });
        }
    }

    render() {

        return (
            <div className="container">
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Search your things</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        placeholder="type here what you want and press enter to search"
                        startAdornment={<InputAdornment position="start">
                            <IconButton>
                                {<SearchOutlinedIcon color="action"></SearchOutlinedIcon>}
                            </IconButton>
                        </InputAdornment>}
                        labelWidth={140}
                        onKeyDown={this.handleKeyDown}
                    />
                </FormControl>
                <div key="search">
                    {this.state.searchResult.map(data => {
                        return (
                            <List key="list">
                                {data.map(item => {
                                    return (
                                        <div key={"items" + item.id}>
                                            <ListItem alignItems="flex-start" button key={"item" + item.id}>
                                                <ListItemAvatar key={"itemAvatar" + item.id}>
                                                    <Avatar key={"avatar" + item.id} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    key={"itemText" + item.id}
                                                    primary={item.title}
                                                    secondary={
                                                        <React.Fragment key={"frag" + item.id}>
                                                            {item.description}
                                                            <br></br>
                                                            {/* <Chip label="key1" className="keys"></Chip>
                                                        <Chip label="key2" className="keys"></Chip>
                                                        <Chip label="key3" className="keys"></Chip>
                                                        <Chip label="key4" className="keys"></Chip> */}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider key={"divider" + item.id} variant="inset" component="li" />
                                        </div>
                                    );
                                })}
                            </List>
                        )
                    })}
                </div>


            </div>
        );
    }
}

export default Search;