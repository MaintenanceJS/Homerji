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
        <div>
          {this.props.workersList.map(item =>
            <WorkerList key={item._id} item={item}/>
          )}
        </div>
      </div>
    )
  }
}

export default Worker;