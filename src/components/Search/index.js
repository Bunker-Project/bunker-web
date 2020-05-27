import React from 'react';
import { useState } from 'react';
import './Search.css';
import '../../global.css';
import Api from '../../Api';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Helmet } from 'react-helmet';

// class Search extends React.Component {
function Search(props) {

    const api = new Api();
    const history = useHistory();
    const palette = {
        primary: {
            main: '#fff'
        }
    };

    const theme = createMuiTheme({ palette });

    const [results, setResults] = useState([]);
    const [txtSearch, setTxtSearch] = useState('');
    const [searchWarning, setSearchWarning] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);
    const [deleteSecret, setDeleteSecret] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    async function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            
            if (validateText())
                await search(txtSearch, 1);
        }
    }

    //Validate if the textfield has a value for searching
    function validateText() {
        var hasValue = txtSearch !== ''
        
        if (!hasValue) {
            setSearchWarning(true);
            return false;
        }

        return true;
    }

    //Calls the api and returns the values
    async function search(value, page) {
        setSearchWarning(false);
        clearCurrentData();
        let response = await api.searchAllByString(value, page);
        setFinalResults(response);

    }

    //Clear all the list to not duplicate the results
    function clearCurrentData() {
        setResults([]);
        // setTxtSearch('');
    }

    //Show all the results from the database
    async function searchAll(page) {
        setSearchWarning(false);

        clearCurrentData();

        let response = await api.searchAllTogether(page);
        
        setFinalResults(response);
    }

    //Set the results and states to update pagination component
    function setFinalResults(response) {

        if (response.headers !== null && response.headers !== undefined) {

            let paginationHeader = JSON.parse(response.headers['x-pagination']);
            setTotalPages(paginationHeader.TotalPages);
            setCurrentPage(paginationHeader.CurrentPage)
            setHasNext(paginationHeader.HasNext);
            setHasPrevious(paginationHeader.HasPrevious);
        }

        setResults(response.data);
    }

    function handleItemClick(index) {
        let item = results[index];

        history.push({
            pathname: '/edit',
            state: {
                id: item.value.id,
                description: item.value.description,
                title: item.value.title,
                keyWords: item.value.keyWords
            }
        })
    }

    function handleSecretClick(index) {
        let secret = results[index];

        history.push({
            pathname: '/editSecret',
            state: {
                isEditing: true,
                secret: {
                    id: secret.value.id,
                    secretId: secret.value.secretId,
                    password: secret.value.passwordAsString
                }
            }
        });
    }

    //To open the confirmation dialog
    function openDeleteItemDialog(index) {
        setDeleteItem(true);
        setCurrentIndex(index);
    }

    //Calls the api and delete an item
    async function handleDeleteItem() {
        setDeleteItem(false);
        let item = results[currentIndex];
        let response = await api.delete({
            api: "items",
            id: item.value.id
        });

        if (response.status === 200)
            setResults(results.filter(data => data.value.id !== item.value.id));
    }

    //To open the confirmation dialog
    function openDeleteSecretDialog(index) {
        setDeleteSecret(true);
        setCurrentIndex(index);
    }

    async function handleDeleteSecret() {
        setDeleteSecret(false);
        let item = results[currentIndex];

        let response = await api.delete({
            api: "secrets",
            id: item.value.id
        });

        if (response.status === 200)
            setResults(results.filter(data => data.value.id !== item.value.id))
    }

    function createObjectByType(item, index) {

        if (item.type === 'secret') {
            return (
                <div className="wrapBox" key={`wrapBox${index}`}>
                    <div className="mainBox" key={`mainBox${index}`}>
                        <div className="boxIcon" key={`boxIcon${0}`}>
                            <VpnKeyIcon key={`iconKey${0}`} color="primary" className="listIcon" />
                        </div>
                        <div className="contentBox" key={`contentBox${index}`}>
                            <span
                                className="boxInfo"
                                key={`boxInfo${index}`}>{item.value.secretId}
                            </span>
                        </div>
                    </div>
                    <div className="boxOptions" key={`boxOptions${index}`}>
                        <button
                            className="buttonOptions smallFont"
                            key={`buttonDelete${index}`}
                            onClick={() => openDeleteSecretDialog(index)}>Delete</button>
                        <button
                            className="buttonOptions smallFont"
                            key={`buttonEdit${index}`}
                            onClick={() => handleSecretClick(index)}>Edit</button>
                    </div>
                </div>
            )
        }
        else {
            return (

                <div className="wrapBox" key={`wrapBox${index}`}>
                    <div className="mainBox" key={`mainBox${index}`}>
                        <div className="boxIcon" key={`boxIcon${0}`}>
                            <DescriptionOutlinedIcon key={`iconKey${0}`} color="primary" className="listIcon" />
                        </div>
                        <div className="contentBox" key={`contentBox${index}`}>
                            <span
                                className="boxInfo"
                                key={`boxInfo${index}`}>{item.value.title}
                            </span>
                        </div>
                    </div>
                    <div className="boxOptions" key={`boxOptions${index}`}>
                        <button
                            className="buttonOptions smallFont"
                            key={`buttonDelete${index}`}
                            onClick={() => openDeleteItemDialog(index)}>Delete</button>
                        <button
                            className="buttonOptions smallFont"
                            key={`buttonEdit${index}`}
                            onClick={() => handleItemClick(index)}>Edit</button>
                    </div>
                </div>

            )
        }
    }

    function handleChange(event, value) {
        
        if (value !== currentPage) {
            
            if (txtSearch.length === 0)
                searchAll(value);
            else
                search(txtSearch, 1);
        }
    }

    return (
        <div className="searchContainer">
            <Helmet>
                <title>Search / Bunker</title>
            </Helmet>
            <ThemeProvider theme={theme}>
                <label
                    htmlFor="txtSearch"
                    className="label"> Search:</label>
                <input
                    type="text"
                    id="txtSearch"
                    className="defaultTextBox"
                    placeholder="Type what you want and press enter"
                    autoFocus
                    onChange={e => setTxtSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={txtSearch}></input>

                <div key="search" className="results">

                    {/* Build the items results */}
                    <div>
                        {results.map((data, index) => {

                            return (
                                <div key={"divWrap" + index}>
                                    {createObjectByType(data, index)}
                                </div>
                            )
                        })}

                        <div className={(hasNext || hasPrevious) ? "pagination" : "paginationHidden"}>
                            <Pagination
                                count={totalPages}
                                color="primary"
                                defaultPage={currentPage}
                                onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </ThemeProvider>

            {/* To show the user a message warning that there is no filter and it can take a long time to finish */}
            <Dialog
                open={searchWarning}
                onClose={() => setSearchWarning(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Search all?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are asking to search all the items that you have, it can take a few minutes, are you sure about that?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSearchWarning(false)} color="primary" autoFocus>
                        No
                    </Button>
                    <Button onClick={() => searchAll(1)} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Dialog for delete an item */}
            <Dialog
                open={deleteItem}
                onClose={() => setDeleteItem(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Delete an item?</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description">
                        Are you sure that you want to delete this item?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setDeleteItem(false)}
                        color="primary"
                        autoFocus>
                        No
                    </button>
                    <button
                        onClick={handleDeleteItem}
                        color="primary">
                        Yes
                    </button>
                </DialogActions>
            </Dialog>

            {/* Dialog for delete a secret */}
            <Dialog
                open={deleteSecret}
                onClose={() => setDeleteSecret(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete a secret?</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description">
                        Are you sure that you want to delete this secret?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => setDeleteSecret(false)} color="primary" autoFocus>
                        No
                    </button>
                    <button
                        onClick={handleDeleteSecret}
                        color="primary">
                        Yes
                    </button>
                </DialogActions>
            </Dialog>

        </div>
    );

}

export default Search;
