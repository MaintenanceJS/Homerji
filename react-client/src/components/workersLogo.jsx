import React from 'react';
import axios from 'axios';


class Workers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: []
        };
    }
    //get the data from the workers page
    componentDidMount() {
        axios.get('/workers')
            .then(function (res) {
                console.log(res);
                // res.redirect('/endpoint')
            })
    }
    render() {
        return (
            <div>
                <button onClick={this.componentDidMount.bind(this)}> Workers</button>
            </div>
        )
    }
}

export default Workers;