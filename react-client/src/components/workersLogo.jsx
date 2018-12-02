import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Sign from './Signup.jsx';
import Login from './Login.jsx';
import Logout from './logout.jsx';


class Workers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []
        };
    }
    // get All the workers information from the database
    getAllWorkers() {
        $('button, h1').hide();
        var that = this;
        axios.get('/workers')
            .then(function (res) {
                that.setState({
                    workers: res.data
                })
            })
    }
    render() {
        return (
            <div>
                <button onClick={this.getAllWorkers.bind(this)}> Register & Login</button>
                {/* <Sign />
                <Login />
                <Logout /> */}
            </div>
        )
    }

}

export default Workers;

