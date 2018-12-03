import React from 'react';
import axios from 'axios';
import Workers from './workers.jsx';
import $ from 'jquery';

class Gardener extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []
        };
    }
    // get All the workers information from the database
    componentDidMount() {
        $('button, input, h1').hide();
        var that = this;
        axios.post('/majors', { major: 'Gardener' })
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
export default Gardener;