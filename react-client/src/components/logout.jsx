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
        window.location.reload();        
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
      </div>
    )
  }
}

export default Logout;