import React from 'react';
import Worker from './workers.jsx';
import $ from 'jquery';
import axios from 'axios';


class Plumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []

        }
    }
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