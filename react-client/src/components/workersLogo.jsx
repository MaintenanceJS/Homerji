import React from 'react';
import React from '/amjad.jsx'
import $ from 'jquery';
class Workers extends React.Component {
    constructor() {
        super();
        this.state = {
            workers: []
        };
    }

    logoClick() {
        //please make a get request and fill the workers array with data from get

    }
    render() {
        return (
            <div>
                <button onClick={this.logoClick.bind(this)}> Workers</button>
                <amjad workers={this.state.workers} />
            </div>
        )
    }
}

export default Workers;