import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class ListWrkersName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: [],
      name: '',
      phonenumber: 0,
      issue: '',
      latitude: 0,
      longtitude: 0
    };
  }

  confirm() {
    $('button, h1, h4, p').hide();
    $('#confirm').show();
    this.getLocation();
  }

  handleName(e) {
    this.setState({
      name: e.target.value
    })
  }
  handlephonenumber(e) {
    this.setState({
      phonenumber: e.target.value
    })
  }
  handleissue(e) {
    this.setState({
      issue: e.target.value
    })
  }
  handlelocation(e) {
    this.setState({
      location: e.target.value
    })
  }
  handleSubmit() {
    axios.post('/userissue', {
      name: this.state.name,
      phonenumber: this.state.phonenumber,
      issue: this.state.issue,
      latitude: this.state.latitude,
      longtitude: this.state.longtitude
    })
    .then(function (res) {
      console.log('working');
    })
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longtitude: position.coords.longitude
        })  
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }



  render() {
    return (
      <div style={{border: '2px solid red', margin: '10px', textAlign:'center'}}>
<<<<<<< HEAD
        <p>Name: {this.props.item.name}</p> 
        <p>Major:{this.props.item.major}</p>
        <p>Rating:{this.props.item.rating}</p>
        <p>Email:{this.props.item.email}</p>
        <p>Description: {this.props.item.description}</p>
        <p>Availability: {this.props.item.availability}</p>
        <p>Phonenumber: {this.props.item.phonenumber}</p>
        
        <button style={{margin:'10px'}} onClick={this.confirm.bind(this)}>Confirm</button><button>Rating</button>
        <div style={{display:'none'}} id='confirm'>
        Name: <input type='text' placeholder="Enter your name" onChange={this.handleName.bind(this)}/> <br/><br/>
        Phonenumber: <input type='text' placeholder="Enter your phonenumber" onChange={this.handlephonenumber.bind(this)}/> <br/><br/>
        Issue: <input type='text' placeholder="Enter your issue" onChange={this.handleissue.bind(this)}/> <br/><br/>
        <input type='button' value='submit' onClick={this.handleSubmit.bind(this)} />
        </div>
      </div>
    )
  }
}

export default ListWrkersName;