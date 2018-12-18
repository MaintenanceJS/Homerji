import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Sign from './Signup.jsx';
import Login from './Login.jsx';
const jwtDecode = require('jwt-decode');
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
            isLoggedIn: false
        }
    }

    componentDidMount(){
        if(localStorage.getItem('Authorization')){
			this.setState({
				isLoggedIn: true
			});
			// this.setState({
			// 	userName: jwtDecode(localStorage.getItem('Authorization')).firstName
			// })
		} else {
			this.setState({
				isLoggedIn: false
			});
		}
    }

    render() {
        return (
            <div>
                <a href ="Sign">
                <Button style={{height: '34px', marginTop: '-7.75px', 'display': this.state.isLoggedIn === false ? 'block': 'none'}} className='' onClick={this.props.handleWorkersButton}>Signin/Signup</Button>
                <Button style={{height: '34px', marginTop: '-7.75px', 'display': this.state.isLoggedIn === true ? 'block': 'none'}} className='' onClick={this.props.handleWorkersButton}>Logout</Button>
                </a>
            </div>
        )
    }

}

export default WorkersLogo;