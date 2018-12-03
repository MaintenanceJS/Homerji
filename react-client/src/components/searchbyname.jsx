import React from 'react';
import SearchedNames from './renderingSearchedNames.jsx';


class SearchByName extends React.Component {
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
            <SearchedNames key={item._id} item={item} />
          )}
        </div>
      </div>
    )
  }
}

export default SearchByName;