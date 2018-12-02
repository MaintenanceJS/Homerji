import React from 'react';
import axios from 'axios';
import Worker from './workers.jsx';
import $ from 'jquery';

class Carpenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []
        };
    }
    // get All the workers information from the database
    getAllWorkers() {
        $('button, input, h1').hide();
        var that = this;
        axios.post('/majors', { major: 'Carpenter' })
            .then(function (res) {
                that.setState({
                    workers: res.data
                })
            })
    }
    render() {
        return (
            <div>
                <button onClick={this.getAllWorkers.bind(this)}> Carpenter</button>
                <Worker workersList={this.state.workers} />
            </div>
        )
    }

}
export default Carpenter;