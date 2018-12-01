import React from 'react';
import WorkerList from './workersList.jsx';

class Worker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            worker: []
        };
    }

    render() {
        return (
            <div>
               <h1>The Workers</h1>
                 {this.props.workersList.map(item =>
                    <WorkerList item={item}/>
                  )}
            </div>
        )
    }
}

export default Worker;