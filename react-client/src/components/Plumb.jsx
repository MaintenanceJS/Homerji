import React from 'react';
import Workers from './workers.jsx'; // Mid component to map workers tickets
import $ from 'jquery';
import axios from 'axios'; // Promise based HTTP client for the browser and node.js


class Plumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []

        }
    }

    // get All the workers information from the database depending on their major
    componentDidMount() {
        $('button, input, h1').hide();
        var that = this;
        axios.post('/Plumb', { major: 'Plumber' })
            .then(function (res) {
                that.setState({
                    workers: res.data
                })
            })
    }
    render() {
        return (
            <div>
                <Worker workersList={this.state.workers} />
            </div>
        )
    }
}
export default Plumb;