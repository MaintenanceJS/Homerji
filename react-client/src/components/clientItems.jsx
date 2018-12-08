import React from 'react';
import SearchedNames from './workersList.jsx';
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button,
    Modal,
    Glyphicon,
    glyphicon
} from "react-bootstrap";
import Maps from "./maps.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import $ from 'jquery';



class Clientitems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, //for the modal
      //these are for the location
      lat: this.props.items.latitude,
      long: this.props.items.longtitude
    };
  }

  //modal functions
  handleShow() {
    this.setState({ 
      show: true 
    });
  }
  handleClose() {
    this.setState({ 
      show: false 
    });
  }

  //remove client
  handleTrash() {
    $.ajax({
      type: 'POST',
      url: '/clientedit',
      data: {
        username: this.props.worker,
        id: this.props.items._id
      },
      success: (data) => {
        alert("removed successfully")
      },
      error: (err) => {
        alert('err')
      }
    });
  }

  render() {
    return (
      <div className='col-md-4 col-md-4 thumbnail' style={{marginRight:"5px", borderSize: "5px", position: 'relative'}}>
        Client Name: {this.props.items.name} <Button  bsStyle="danger" className='glyphicon glyphicon-trash' onClick={this.handleTrash.bind(this)} style={{position: 'absolute', top: '3px', right: '3px'}}> 
        </Button>
        <br /><br />
        Client Phonenumber: {this.props.items.phonenumber} <br /><br />
        Client Issue: {this.props.items.issue} <br /><br />
        <Button bsStyle="info" onClick={this.handleShow.bind(this)}>
          Client location
        </Button>
        
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Body style={{textAlign:'left', marginLeft: '10px'}}>
            <h5> Client location </h5>
          </Modal.Body>
          <Route style={{marginTop: "200px !important"}} component={() =>  <Maps lat={this.state.lat} long={this.state.long} signin={'signin'} />} />
          <Modal.Footer style={{marginTop: '30px', textAlign:'center'}}>
            <Button onClick={this.handleClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Clientitems;



