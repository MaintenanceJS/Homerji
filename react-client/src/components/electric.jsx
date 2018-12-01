import React from 'react';
import axios from 'axios';
import Worker from './workers.jsx';
import $ from 'jquery';

class Electric extends React.Component {
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
        axios.post('/majors', { major: 'Electrician' })
            .then(function (res) {
                console.log(res.data)

                that.setState({
                    workers: res.data
                })
            })
    }
    render() {
        return (
            <div>
                <button onClick={this.getAllWorkers.bind(this)}> Electric</button>
                <Worker workersList={this.state.workers} />
            </div>
        )
    }

}
export default Electric;