import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import './Form.css';
import Register from './Register.js';
import Search from './Search.js';
import Secret from './Secret.js';
import NavBar from './Navbar';

function Form(props) {

    function handleFormType() {

        if (props.id === "search")
            return <Search key="searchForm"></Search>
        else if (props.id === "register")
            return <Register key="registerForm"></Register>
        else
            return <Secret key="secretForm"></Secret>
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <div>
            <Dialog fullScreen open={true} onClose={props.onClose} TransitionComponent={Transition}>
                <NavBar showReturnButton={false}></NavBar>
                <div key="formType" className="form">
                    {handleFormType()}
                </div>
            </Dialog>
        </div>
    );
}

export default Form;