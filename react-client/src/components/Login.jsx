import React from 'react';
import $ from 'jquery';
import Dropdown from 'react-drop-down' // Library from npm
import ClientItems from "./clientItems.jsx";
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button,
    Glyphicon,
    DropdownButton,
    MenuItem
} from "react-bootstrap"; // For Designing


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      username: '',
      password: '',
      loggedin: false,
      major: 'Choose',
      name: '',
      email: '',
      description: '',
      phonenumber: 0,
      availability: 'Choose',
      clients: []
    };
  }

  componentDidMount() {
    $('.edit, .submit').hide() // To hide any unwanted components
    if (this.state.loggedin === true) { //to check if the user is logged in
      $('.edit').show() //show edit inputs
    }
    this.setState({
      shown: false
    })
  }

  //get the clients from database
  handleClients() { 
    $.ajax({
      type: 'POST',
      url: '/show',
      data: {username: this.state.username},
      success: (data) => {
        this.setState({
          clients: data
        })
      },
      error: (err) => {
        alert('err', err);
      }
    });
  }

  // When click on login word
  handleOnClick() { 
    this.setState({
      shown: !this.state.shown
    })
    if (!this.state.shown) {
      $('.login, .submit').show()
    } else {
      $('.login, .submit').hide()
    }
  }

  //login request
  handleSubmit() {
    $.ajax({
      type: 'POST',
      url: '/login',
      data: { username: this.state.username, password: this.state.password },
      success: (data) => {
        this.setState({
          loggedin: true,
          username: data.username,
          major: data.major,
          name: data.name,
          email: data.email,
          description: data.description,
          phonenumber: data.phonenumber,
          availability: data.availability
        })
        $('.edit').show()
        $('.login').hide()
      },
      error: (err) => {
        alert('wrong password or username');
      }
    });
  }

  //Worker fields editing 
  handleUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleMajor(e) {
    var arr = ['Electrician', 'Plumber', 'Painter', 'Carpenter', 'Gardener', 'Furniture']
    this.setState({
      major: arr[e]
    })
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  handlePhonenumber(e) {
    this.setState({
      phonenumber: e.target.value
    })
  }


  handleAvailability(e) {
    var arr = ['Yes', 'No']
    this.setState({
      availability: arr[e]
    })
  }

  //new values request
  handleEdit() { // Worker profile editing after login
    $.ajax({
      type: 'POST',
      url: '/edit',
      data: {
        username: this.state.username,
        name: this.state.name,
        major: this.state.major,
        email: this.state.email,
        password: this.state.password,
        description: this.state.description,
        phonenumber: this.state.phonenumber,
        availability: this.state.availability,
      },
      success: (data) => {
      },
      error: (err) => {
      }
    });
  }

  render() {
    return (
      <div>
        <label style={{marginTop: '10px'}} className='login'>
          <p style={{marginLeft: '5px'}}> Username: <input type="text" onChange={this.handleUsername.bind(this)} /> </p>
        </label> <br />
        <label className='login'>
          <p style={{marginLeft: '7px'}}> Password: <input type="password" onChange={this.handlePassword.bind(this)} /> </p>
        </label> <br />
        <Button bsStyle="success" style={{marginLeft: '8%'}} onClick={this.handleSubmit.bind(this)} className='login'> Submit </Button>

        <Button style={{marginLeft: '15px'}} bsStyle="primary" className='edit' onClick={this.handleClients.bind(this)} > Click here to see your Clients </Button>
        <br /><br />
        <div className='container' >
          {this.state.clients.map(client => <ClientItems className="row" key={client._id} worker={this.state.username} items={client}/>)}
        </div>
          <br />
          <hr />
        <h4 className='edit'> Change in your profile </h4>
        <form className='edit'>
          <label style={{marginLeft: '60px'}}>
            Name: <input style={{marginLeft: '10px'}} type="text" onChange={this.handleName.bind(this)} />
          </label> <br />
          <label style={{marginLeft: '60px'}}>
            Major: 
            <DropdownButton style={{marginLeft: '16px'}}
              title={this.state.major}
              //key={i}
              id={this.state.major}
              onSelect={this.handleMajor.bind(this)}
            > 
              <MenuItem eventKey="0" active>Electrician</MenuItem>
              <MenuItem eventKey="1">Plumber</MenuItem>
              <MenuItem eventKey="2">Painter</MenuItem>
              <MenuItem eventKey="3">Carpenter</MenuItem>
              <MenuItem eventKey="4">Gardener</MenuItem>
              <MenuItem eventKey="5">Furniture</MenuItem>

            </DropdownButton>
          </label> <br />

          <label style={{marginLeft: '22px'}}>
            Availability: 
            <DropdownButton style={{marginLeft: '16px'}}
              title={this.state.availability}
              //key={i}
              id={this.state.major}
              onSelect={this.handleAvailability.bind(this)}
            > 
              <MenuItem eventKey="0" active>Yes</MenuItem>
              <MenuItem eventKey="1">No</MenuItem>
            </DropdownButton>
          </label> <br />

          <label style={{marginLeft: '65px'}}>
            Email: <input style={{marginLeft: '10px'}} type="email" onChange={this.handleEmail.bind(this)} />
          </label> <br />
          <label style={{marginLeft: '36px'}}>
            Password: <input style={{marginLeft: '10px'}} type="password" onChange={this.handlePassword.bind(this)} required/>
          </label> <br />
          <label style={{marginLeft: '26px'}}>
            Description: <input style={{marginLeft: '10px'}} type="text" onChange={this.handleDescription.bind(this)} />
          </label> <br />
          <label style={{marginLeft: '10px'}}>
            Phonenumber: <input style={{marginLeft: '10px'}} type="number" onChange={this.handlePhonenumber.bind(this)} />
          </label> <br />
          <Button bsStyle="success" style={{marginLeft: '12%'}} onClick={this.handleEdit.bind(this)} className='edit'> Submit </Button>
        </form> <br /> <br />
      </div>
    )
  }
}
export default Login;




//
