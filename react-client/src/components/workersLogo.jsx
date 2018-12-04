import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Sign from './Signup.jsx';
import Login from './Login.jsx';
import Logout from './logout.jsx';
//import { FiHome } from "react-icons/fi";\
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
        };
    }

    render() {
        return (
            <div>
                <Button style={{height: '34px', marginTop: '-7.75px'}} className='' onClick={this.props.handleWorkersButton}> Workers </Button>
            </div>
        )
  }

}

export default WorkersLogo;

//className='glyphicon glyphicon-home'