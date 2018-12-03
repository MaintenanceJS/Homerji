import React from 'react';
import $ from 'jquery';


class ListWrkersName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: []
    };
  }

  render() {
    return (
      <div style={{border: '2px solid red', margin: '10px', textAlign:'center'}}>
        Name: {this.props.item.name} <br/>
        Major:{this.props.item.major}<br/>
        Rating:{Math.ceil(this.props.item.rating)}<br/>
        Email:{this.props.item.email}<br/>
        Description: {this.props.item.description}<br/>
        Availability: {this.props.item.availability}<br/>
        Phonenumber: {this.props.item.phonenumber}
      </div>
    )
  }
}

export default ListWrkersName;