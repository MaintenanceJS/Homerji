import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Sign from './Signup.jsx';
import Login from './Login.jsx';
import Logout from './logout.jsx';
//import { FiHome } from "react-icons/fi";
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button,
    Glyphicon
} from "react-bootstrap";

class WorkersLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    componentDidMount() {
    }

    handleButton() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return (
            <div>
                <button className='glyphicon glyphicon-wrench' onClick={this.props.handleWorkersButton}> Workers </button>
            </div>
        )
    }

}

export default WorkersLogo;

//className='glyphicon glyphicon-home'