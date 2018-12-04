import React from 'react';
import $ from 'jquery';


class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  output() {
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: (data) => {
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div style={{cursor: 'pointer'}}>
        <h4 onClick={this.output.bind(this)}> Logout </h4>
      </div>
    )
  }
}

export default Logout;