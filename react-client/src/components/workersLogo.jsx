import React from 'react';
import axios from 'axios';
// import React from '/amjad.jsx'
import $ from 'jquery';
class Workers extends React.Component {
    constructor() {
        super();
        this.state = {
            workers: []
        };
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(function (res) {
                console.log(res);
            })

    }
    render() {
        return (
            <div>
                <button onClick={this.componentDidMount.bind(this)}> Workers</button>
                {/* <amjad workers={this.state.workers} /> */}
            </div>
        )
    }
}

export default Workers;