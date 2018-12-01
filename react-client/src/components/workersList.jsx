import React from 'react';
import $ from 'jquery';
import Dropdown from 'react-drop-down'


class WorkerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: [],
      rating: props.item.rating,
      state: props.item.state
    };
  }

  handleMajor (e) {
    var average = this.state.rating + e / 2
    this.setState({
      rating: average
    })
  }

  handleRateClick() {
    $.ajax({
      type: 'POST',
      url: '/rating',
      data: { rating: this.state.rating, username: this.props.item.username},
      success: (data) => {
        console.log('rating is sent')
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div style={{border: '2px solid red', margin: '10px', textAlign:'center'}}>
        Name: {this.props.item.name} <br/>
        Major: {this.props.item.major}<br/>
        Rating: {this.props.item.rating}<br/>
        Email: {this.props.item.email}<br/>
        Username: {this.props.item.username}<br/>
        Description: {this.props.item.description}<br/>
        Availability: {this.props.item.availability}<br/>
        Phonenumber: {this.props.item.phonenumber}<br />
        <Dropdown value={this.state.major}
                  onChange={this.handleMajor.bind(this)}
                  options={[ '0', '1', '2', '3', '4', '5']} />
        <button onClick={this.handleRateClick.bind(this)}> Rate </button>
          
      </div>
    )
  }
}

export default WorkerList;