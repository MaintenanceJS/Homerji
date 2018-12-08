import React from 'react';
import $ from 'jquery';
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button,
    Modal,
    Glyphicon
} from "react-bootstrap";
import Dropdown from 'react-drop-down'
import axios from 'axios';
import Maps from "./maps.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";

class ListWorkersName extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      rate: Math.ceil(this.props.item.rating),
      rating: 0,
      name: 'Default',
      phonenumber: 0,
      issue: 'Default',
      latitude: 0,
      longtitude: 0,
      show: false //for the Modal
    };
  }

  //client rating
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
        window.location.reload();
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  //getting location data ready
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
  componentDidMount() {
    this.getLocation(); //client location for map
  }

  //showing clients functions
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

  //handle worker requesting from the client modal
  handleSubmit() {
    var scope = this;
    axios.post('/newClient', {
      workerUsername: this.props.item.username,
      clientName: this.state.name,
      phonenumber: this.state.phonenumber,
      issue: this.state.issue,
      latitude: this.state.latitude,
      longtitude: this.state.longtitude
    })
    .then(function (res) {
      scope.handleClose()
    })
  }

  //modal functions
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  

  render() {
    return (
      <Router history={browserHistory}>
      <div  style={{marginTop: '10px', textAlign:'center'}} >
        <div className="col">
          <div className="col-sm-5 col-md-4">
            <div className="thumbnail">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTey3twEwY6j_wjrv6BhcjKFLKx9NWZhg3kxIuNXTwEMNC5_JUOUw" alt="..." />
              <div className="caption">
                <h3>{this.props.item.username}</h3>
                Name: {this.props.item.name} <br/>
                Major: {this.props.item.major} <br/>
                Rating: {Math.ceil(this.props.item.rating)} <br/>
                Email: {this.props.item.email} <br/>
                Description: {this.props.item.description} <br/>
                Phonenumber: {this.props.item.phonenumber} <br/>
                Availability: {this.props.item.availability} <br/>
                <p><Dropdown value={String(this.state.rating)}
                  onChange={this.handleRate.bind(this)}
                  options={[ '0', '1', '2', '3', '4', '5']} />
                  <a className="btn btn-primary" role="button" onClick={this.handleRateClick.bind(this)}>
                    Rate
                  </a>  
                </p> 
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                  Request
                </Button>

                <div id='confirm'>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Body style={{textAlign:'left', marginLeft: '10px'}}>
                    <div style={{marginLeft: '51px'}}>Client Name <input onKeyUp={function(event) {
                  event.preventDefault();
                  if (event.keyCode === 13) {
                  $("#myBtn1").click();
                  }
                  }} style={{height: '28px', width:'50%', marginBottom: '-10px'}} type='text' placeholder="Full Name" onChange={this.handleName.bind(this)}/></div> <br/>
                    Client Phonenumber <input onKeyUp={function(event) {
                  event.preventDefault();
                  if (event.keyCode === 13) {
                  $("#myBtn1").click();
                  }
                  }} style={{height: '28px', width:'50%', marginBottom: '-100px'}} type='number' placeholder="Phonenumber" onChange={this.handlephonenumber.bind(this)}/> <br/><br/>
                    Client Issue <textarea onKeyUp={function(event) {
                  event.preventDefault();
                  if (event.keyCode === 13) {
                  $("#myBtn1").click();
                  }
                  }} style={{height: '60px', width:'97%', borderColor: 'lightgrey', marginBottom: '-10px'}} type='text' placeholder="Enter your issue" onChange={this.handleissue.bind(this)}/> <br/><br/>
                    <center><Button  id="myBtn1" bsStyle="success" style={{marginBottom: '70%'}} className="btn btn-default" onClick={this.handleSubmit.bind(this)}>
                      Submit worker requesting
                    </Button></center>
                    <Route component={() =>  <Maps lat={this.state.latitude} long={this.state.longtitude} />} />
                  </Modal.Body>
                  <Modal.Footer style={{marginTop: '30px', textAlign:'center'}}>
                    <Button onClick={this.handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
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

export default ListWorkersName;
