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
// import Chip from '@material-ui/core/Chip';
import Api from '../Api';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemsResult: [],
            secretsResult: [],
            results: [],
            mergedArray: Object,
            api: new Api({ isDev: true }),
            txtSearch: '',
            noValueSnackBarOpen: false,
            value: null,
            expanded: false,
            history: props.history,
            dense: false,
            secondary: false
        };
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
            this.searchItems(value);
            this.searchSecrets(value);
        }
    }

    async searchItems(value) {
        let response = await this.state.api.searchByEntity({
            api: "items",
            searchString: value
        });
        this.setState({
            itemsResult: [...this.state.itemsResult, response.data]
        })
    }

    async searchSecrets(value) {
        let response = await this.state.api.searchByEntity({
            api: "secrets",
            searchString: value
        })

        this.setState({
            secretsResult: [...this.state.secretsResult, response.data]
        });

    }

    async getAllItems() {
        let response = await this.state.api.getAll({
            api: "items"
        });

        this.setState({
            itemsResult: [...this.state.itemsResult, response.data]
        })
    }

    async getAllSecrets() {
        let response = await this.state.api.getAll({
            api: "secrets"
        });

        this.setState({
            secretsResult: [...this.state.secretsResult, response.data]
        })
    }

    //Clear all the list to not duplicate the results
    clearCurrentData() {
        this.setState({
            itemsResult: [],
            secretsResult: []
        })
    }

    //Show all the results from the database
    async showAllClick() {
        this.clearCurrentData();
        let response = await this.state.api.searchAllTogether();

        this.setState({
            results: [...this.state.results, response.data]
        });
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

    handleTabChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    handleChange = panel => (event, isExpanded) => {
        this.setState({
            expanded: isExpanded ? panel : false
        })
    }

    handleItemClick = index => {
        let firstIndex = this.state.itemsResult[0];

        let item = firstIndex[index];

        console.log(item.keyWords);

        this.state.history.push({
            pathname: '/edit',
            state: {
                id: item.id,
                description: item.description,
                title: item.title,
                keyWords: item.keyWords
            }
        })
    }

    generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    handleSecretClick = index => {
        console.log("The index is: " + index);
    }

    createObjectByType(item, index) {
        if (item.type === 'secret') {
            return (
                <ListItem
                    button>
                    <ListItemAvatar key={`listSecretAvatar${index}`}>
                        <Avatar key={`avatarSecret${index}`}>
                            <VpnKeyIcon key={`iconKey${index}`} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        key={item.value.id}
                        primary={item.value.secretId}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        }
        else {
            return (

                <ListItem
                    button>
                    <ListItemAvatar key={`listItemAvatar${index}`}>
                        <Avatar key={`avatarItem${index}`}>
                            <DescriptionOutlinedIcon key={`iconDesc${index}`} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        key={item.value.id}
                        primary={item.value.title}
                        secondary={item.value.description}
                        // secondary={
                        //     <div key={"frag" + item.id}>
                        //         {item.value.description}
                        //         <br></br>
                        //         {item.value.keyWords.map(keyword => {
                        //             return (
                        //                 <Chip key={keyword.id} label={keyword.description} className="keys"></Chip>
                        //             );
                        //         })}
                        //     </div>
                        // }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

            )
        }
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
                            endAdornment={<InputAdornment position="end">
                                <button
                                    className="seeAll"
                                    onClick={() => this.showAllClick()}>
                                    See all results
                                </button>
                            </InputAdornment>
                            }
                            labelWidth={140}
                            onKeyDown={this.handleKeyDown}
                            value={this.state.txtSearch}
                            onChange={this.updateVariables}
                        />
                    </FormControl>
                </div>
                <div key="search" className="results">

                    {/* Build the items results */}
                    <List dense={this.state.dense}>
                        {this.state.results.map((data, index) => {
                            return (
                                <div key={"divWrap" + index}>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <div key={"divInternal" + index}>
                                                    {this.createObjectByType(item)}
                                                    <Divider key={"divider" + index} variant="inset" component="li" />
                                                </div>
                                            )
                                        })}
                                </div>
                            )
                        })}

                    </List>
                </div>

                <SnackBar
                    open={this.state.noValueSnackBarOpen}
                    onClose={this.closeSnackMessage}
                    autoHideDuration={6000}>
                    <MuiAlert elevation={6} variant="filled" severity="info">
                        Please type a value or click on "Show all" on the right side
                         </MuiAlert>
                </SnackBar>
            </div >
        );
    }
}

export default withRouter(Search);