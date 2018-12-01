import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Login from './Login.jsx';
import Sign from './Signup.jsx';



class Workers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []
        };
    }
    // get All the workers information from the database
    getAllWorkers() {
        $('button, input, h1, h4').hide();
        var that = this;
        console.log(this.state.workers, 'sdsdfgeg')
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
                <Login />
                <Sign />
            </div>
        )
    }

}

export default Workers;

