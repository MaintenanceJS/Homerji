//new file name 



import React from 'react';
import $ from 'jquery';
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button,
    Glyphicon
} from "react-bootstrap";
import Dropdown from 'react-drop-down'
import axios from 'axios';
import Maps from "./maps.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";

class ListWrkersName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: [],
      rate: Math.ceil(this.props.item.rating),
      rating: 0,
      name: 'Default',
      phonenumber: 0,
      issue: 'Default',
      latitude: 0,
      longtitude: 0
    };
  }

  handleRate (e) {
    this.setState({
      rating: e
    })
  }

  handleRateClick() {
    $.ajax({
      type: 'POST',
      url: '/rating',
      data: { rating: this.state.rating, username: this.props.item.username},
      success: (data) => {
        
      },
      error: (err) => {
        console.log('err', err);
      }
    });
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
    // console.log('Amjad digger')
    // axios.post('/userissue', {
    //   name: this.state.name,
    axios.post('/newClient', {
      workerUsername: this.props.item.username,
      clientName: this.state.name,
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
      <div style={{margin: '10px', textAlign:'center'}}>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail" style={{'border':'red'}}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWwwZo27QSdHZL6ogED-K7qn6hzgGItV9JanqTzFdNbKZUA1v" alt="..." />
              <div className="caption">
                <h3>{this.props.item.username}</h3>
                Name: {this.props.item.name} <br/>
                Major:{this.props.item.major}<br/>
                Rating:{Math.ceil(this.props.item.rate)}<br/>
                Email:{this.props.item.email}<br/>
                Description: {this.props.item.description}<br/>
                Phonenumber: {this.props.item.phonenumber}
                <p><Dropdown value={'3'}
                  onChange={this.handleRate.bind(this)}
                  options={[ '0', '1', '2', '3', '4', '5']} /><a href="#" className="btn btn-primary" role="button" onClick={this.handleRateClick.bind(this)}>Rate</a>  
                 <Link to="/tickets"><button className="btn btn-default" style={{margin:'10px'}} onClick={this.confirm.bind(this)}>Request</button></Link></p> 
                <div style={{display:'none'}} id='confirm'>
                  Client Name: <input type='text' placeholder="Full Name" onChange={this.handleName.bind(this)}/> <br/><br/>
                  Client Phonenumber: <input type='number' placeholder="Phonenumber" onChange={this.handlephonenumber.bind(this)}/> <br/><br/>
                  Client Issue: <input style={{height: '100px', width:'200px'}} type='text' placeholder="Enter your issue" onChange={this.handleissue.bind(this)}/> <br/><br/>
                  <input type='button' value='Submit worker requesting' onClick={this.handleSubmit.bind(this)} />

                  <div style={{ width:'50%', marginLeft:'20%', marginTop: '20px'}}>
                  <Route style={{ width:'50%', height:'50%'}} path='/tickets' component={() => 
                  <Maps style={{ width:'50%', height:'50%'}} lat={this.state.latitude} long={this.state.longtitude} />} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      </Router>
    )
  }
}

export default ListWrkersName;
