import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Tickets from "./maps.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";

class ListWrkersName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: [],
      name: '',
      phonenumber: 0,
      issue: '',
      latitude: 35,
      longtitude: 31
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
    console.log('Amjad digger')
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
       <Router history={browserHistory}>
      <div style={{border: '2px solid red', margin: '10px', textAlign:'center',zIndex:'10'}}>
        <p>Name: {this.props.item.name}</p> 
        <p>Major:{this.props.item.major}</p>
        <p>Rating:{this.props.item.rating}</p>
        <p>Email:{this.props.item.email}</p>
        <p>Description: {this.props.item.description}</p>
        <p>Availability: {this.props.item.availability}</p>
        <p>Phonenumber: {this.props.item.phonenumber}</p>
          
        <Link to="/tickets"><button style={{margin:'10px'}} onClick={this.confirm.bind(this)}>Confirm</button></Link>
        <button>Rating</button>
        <div style={{display:'none'}} id='confirm'>
        Name: <input type='text' placeholder="Enter your name" onChange={this.handleName.bind(this)}/> <br/><br/>
        Phonenumber: <input type='text' placeholder="Enter your phonenumber" onChange={this.handlephonenumber.bind(this)}/> <br/><br/>
        Issue: <input type='text' placeholder="Enter your issue" onChange={this.handleissue.bind(this)}/> <br/><br/>
         <div style={{ width:'50%', marginLeft:'40%', marginBottom: '370px'}}><Route style={{ width:'50%', height:'50%'}} path='/tickets' component={() => 
          <Tickets style={{ width:'50%', height:'50%'}} lat={this.state.latitude} long={this.state.longtitude} />} /></div>
        <input style={{marginTop: '50px', zIndex: '10'}} type='button' value='submit' onClick={this.handleSubmit.bind(this)} />
        </div>

      </div>

      </Router>
    )
  }
}

export default ListWrkersName;