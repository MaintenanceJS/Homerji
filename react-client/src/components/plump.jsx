import React from 'react';
import Worker from './workers.jsx';
import $ from 'jquery';
import axios from 'axios';


class Plump extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []

        }
    }
    getAllPlumbers() {
        $('button, input, h1').hide();
        var that = this;
        console.log(this.state.workers, 'sdsdfgeg')
        axios.post('/majors', { major: 'Plumber' })
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
                <button onClick={this.getAllPlumbers.bind(this)}>Plumping</button>
                <Worker workersList={this.state.workers} />
            </div>
        )
    }
}
export default Plump;