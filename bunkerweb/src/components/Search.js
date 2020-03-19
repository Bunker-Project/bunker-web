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
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ListItemIcon from '@material-ui/core/ListItemIcon';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            api: new Api({ isDev: true }),
            txtSearch: '',
            noValueSnackBarOpen: false,
        };
    }

    handleClick = () => {
        console.log('Clicked');
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (this.validateText()) {
                event.preventDefault();
                this.search(event.target.value);
            }
        }
    }

    //Validate if the textfield has a value for searching
    validateText = () => {
        var hasValue = this.state.txtSearch !== ''
        
        if (!hasValue)
            this.openSnackMessage();

        return hasValue;
    }

    //Calls the api and returns the values
    search = (value) => {
        this.clearCurrentData();
        if (this.validateText()) {
            this.state.api.search({
                api: "items",
                searchString: value
            }).then(response => {
                this.setState({
                    searchResult: [...this.state.searchResult, response.data]
                });
            });
        }
    }

    //Clear all the list to not duplicate the results
    clearCurrentData(){
        this.setState({
            searchResult: []
        })
    }

    //Show all the results from the database
    showAllClick() {
        this.clearCurrentData();
        this.state.api.getAll({
            api: "items"
        }).then(response => {
            this.setState({
                searchResult: [...this.state.searchResult, response.data]
            })
        })
    }

    //Keep updated the variables to use to make requests later on
    updateVariables = event => {
        this.setState({
            txtSearch: event.target.value
        });
    }

    //Opens the snack message in case of the search text is empty
    openSnackMessage = () => {
        this.setState({
            noValueSnackBarOpen: true
        });
    }

    //Closes the snack info bar
    closeSnackMessage = () => {
        this.setState({
            noValueSnackBarOpen: false
        });
    }

    render() {

        return (
            <div className="container">
                <div className="textBar">
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Search your things</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            placeholder="type what you want and press enter or click the icon"
                            startAdornment={<InputAdornment position="start">
                                <IconButton onClick={() => this.search(this.state.txtSearch)}>
                                    {<SearchOutlinedIcon color="action"></SearchOutlinedIcon>}
                                </IconButton>
                            </InputAdornment>}
                            labelWidth={140}
                            onKeyDown={this.handleKeyDown}
                            value={this.state.txtSearch}
                            onChange={this.updateVariables}
                        />
                    </FormControl>

                    <div className="showAll">
                        <Button variant="outlined" onClick={() => this.showAllClick()}>Show all</Button>
                    </div>
                </div>
                <div key="search">
                    {this.state.searchResult.map(data => {
                        return (
                            <List key="list">
                                {data.map(item => {
                                    return (
                                        <div key={"items" + item.id}>
                                            <ListItem alignItems="flex-start" button key={"item" + item.id}>
                                                <ListItemIcon key={"itemAvatar" + item.id}>
                                                    <DescriptionOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    key={"itemText" + item.id}
                                                    primary={item.title}
                                                    secondary={
                                                        <React.Fragment key={"frag" + item.id}>
                                                            {item.description}
                                                            <br></br>
                                                            {item.keyWords.map(keyword => {
                                                                return (
                                                                    <Chip key={keyword.id} label={keyword.description} className="keys"></Chip>
                                                                );
                                                            })}
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

                <SnackBar
                    open={this.state.noValueSnackBarOpen}
                    onClose={this.closeSnackMessage}
                    autoHideDuration={6000}>
                        <MuiAlert elevation={6} variant="filled" severity="info">
                            Please type a value or click on "Show all" on the right side
                        </MuiAlert>
                </SnackBar>
            </div>
        );
    }
}

export default Search;