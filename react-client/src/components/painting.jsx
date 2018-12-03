import React from 'react';
import axios from 'axios';
import Workers from './workers.jsx';
import $ from 'jquery';

class Painting extends React.Component {
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
        axios.post('/majors', { major: 'Painter' })
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
                <Workers workersList={this.state.workers} />
            </div>
        )
    }

}

export default Painting;

