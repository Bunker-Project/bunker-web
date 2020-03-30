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
import Chip from '@material-ui/core/Chip';
import Api from '../Api';
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemsResult: [],
            secretsResult: [],
            mergedArray: Object,
            api: new Api({ isDev: true }),
            txtSearch: '',
            noValueSnackBarOpen: false,
            value: null,
            expanded: false,
            history: props.history
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
        let response = await this.state.api.search({
            api: "items",
            searchString: value
        });
        this.setState({
            itemsResult: [...this.state.itemsResult, response.data]
        })
    }

    async searchSecrets(value) {
        let response = await this.state.api.search({
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
        await this.getAllItems();
        await this.getAllSecrets();
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

    handleSecretClick = index => {
        console.log("The index is: " + index);
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
                                <button className="seeAll">
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
                    {this.state.itemsResult.map(data => {
                        return (
                            <ExpansionPanel key="expPanelItems" expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    key="panel1bh-header"
                                >
                                    <Typography className="heading" key="itemsHeadingText">Items</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className="listItem">
                                    <List key="list" className="list">
                                        {data.map((item, index) => {
                                            return (
                                                <div key={"items" + item.id} >
                                                    <ListItem
                                                        alignItems="flex-start"
                                                        button
                                                        key={"item" + item.id}
                                                        onClick={() => this.handleItemClick(index)} >
                                                        <ListItemAvatar key={"itemAvatar" + item.id}>
                                                            <Avatar key={"avatar" + item.id}>
                                                                <DescriptionOutlinedIcon key={"descIcon" + item.id} />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            key={"itemText" + item.id}
                                                            primary={item.title}
                                                            secondary={
                                                                // <React.Fragment key={"frag" + item.id}>
                                                                <div key={"frag" + item.id}>
                                                                    {item.description}
                                                                    <br></br>
                                                                    {item.keyWords.map(keyword => {
                                                                        return (
                                                                            <Chip key={keyword.id} label={keyword.description} className="keys"></Chip>
                                                                        );
                                                                    })}
                                                                    {/* </React.Fragment> */}
                                                                </div>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider key={"divider" + item.id} variant="inset" component="li" />
                                                </div>
                                            );
                                        })}

                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    })}

                    {this.state.secretsResult.map(secrets => {
                        return (
                            <ExpansionPanel key="expPanelSecrets" expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    key="panel2bh-header"
                                >
                                    <Typography className="heading" key="secretsText">Secrets</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className="listItem" key="expPanelDetailsSecrets">
                                    <List key="list" className="list">
                                        {secrets.map((sec, index) => {
                                            return (
                                                <div key={"items" + sec.id} >
                                                    <ListItem
                                                        button
                                                        key={"item" + sec.id}
                                                        onClick={() => this.handleSecretClick(index)}>
                                                        <ListItemIcon key={"itemIcon" + sec.id}>
                                                            <Avatar key={"avatar" + sec.id}>
                                                                <VpnKeyIcon key={"secretIcon" + sec.id} />
                                                            </Avatar>
                                                        </ListItemIcon>
                                                        <ListItemText primary={sec.secretId} />
                                                    </ListItem>
                                                    <Divider key={"divider" + sec.id} variant="inset" component="li" />
                                                </div>
                                            );
                                        })}
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
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
            </div >
        );
    }
}

export default withRouter(Search);