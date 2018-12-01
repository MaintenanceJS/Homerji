import React from 'react';
import axios from 'axios';
import Worker from './workers.jsx';
import $ from 'jquery';

class Workers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []
        };
    }
    // get All the workers information from the database
    component1() {
        $('button, input, h1').hide();
        var that = this;
        axios.get('/workers')
        .then(function(res){
            that.setState({
              workers: res.data
            })
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.component1.bind(this)}> Workers</button>
                <Worker workersList={this.state.workers}/>
            </div>
        )
    }
}

export default Workers;

