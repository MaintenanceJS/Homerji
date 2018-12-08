import React from 'react';
import axios from 'axios'; // Promise based HTTP client for the browser and node.js
import Workers from './workers.jsx'; // Mid component to map workers tickets
import $ from 'jquery';

class Carpenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []
        };
    }
    
    // get All the workers information from the database depending on their major
    componentDidMount() {
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
                <Workers workersList={this.state.workers} />
            </div>
        )
    }
}
export default Carpenter;

