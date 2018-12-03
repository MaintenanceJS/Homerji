import React from 'react';
import WorkerListRender from './workersListRender.jsx';


class Workers extends React.Component {
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
            <WorkerListRender key={item._id} item={item} />
          )}
        </div>
      </div>
    )
  }
}

export default Workers;