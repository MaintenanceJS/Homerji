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
      success: () => {        
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  refresh() {
    window.location.reload();
  }

  render() {
    return (
      <div style={{cursor: 'pointer'}}>
        <h4 onClick={this.output.bind(this)} onClick={this.refresh.bind(this)}> Logout </h4>
      </div>
    )
  }
}

export default Logout;