import React from 'react';
//import workersListRender from './workersListRender.jsx';
import $ from 'jquery';
import Dropdown from 'react-drop-down'
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


class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Unknown',  //default value (changable)
      major: 'Choose', //default value (changable)
      rating: 3, //default value (unchangable)
      email: 'Unkown@unkown.com',
      username: 'Unkown',  //default value (changable)
      password: 'Unkown',  //default value (changable)
      description: 'Unkown',  //default value (changable)
      availability: 'Yes', //default value (unchangable)
      phonenumber: 0, //default value (changable)
      select: 'Choose',
      worker: '',
      location: '',
      ProfilePicture:null
    };
  }

//handle sign up inputs

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


  handleUserClick(e) {
    let arr1 = ['User', 'Worker']
    console.log(typeof e)
    // console.log('state select', this.state.select)
    // console.log('eee', e)
    
    // console.log('select 2', this.state.select)
    // console.log('worker 1', this.state.worker)
    // this.setState({
    //   worker: arr1[e]
    // })
    // console.log('worker 2', this.state.worker)
    setTimeout(() => {
      if (e === '0'){
        this.setState({
          worker: 'User',
          select: 'User'
        })
        console.log(this.state)
      } else if (e === '1'){
          this.setState({
            worker: 'Worker',
            select: 'Worker'
          })
          
      } 
      
      console.log('------')
    }, 100)
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

  handleLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  handlePhonenumber(e) {
    this.setState({
      phonenumber: e.target.value
    })
  }

  handleProfilePicture(e) {
    console.log(e)
    this.setState({
      ProfilePicture: e.target.value
    })
  }

  //submit sign up
  handleSubmit() {

///////////////////







//////////////////
      $.ajax({
        type: 'POST',
        url: '/signup',
        data: {
          name: this.state.name,
          major: this.state.major,
          rating: this.state.rating,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          description: this.state.description,
          availability: this.state.availability,
          phonenumber: this.state.phonenumber,
          isWorker: this.state.worker,
          location: this.state.location,
          ProfilePicture: this.state.ProfilePicture

        },
        success: (data) => {
          alert('signed up')
          $('input').val(''); //inputs values will be empty
        },
        error: (err) => {
          alert('username is already existed');
          console.log('err', err);
        }
      });
  }

  render() {
    return (
      <div>
      <div style={{fontWeight: 'bold', marginLeft: '60px', marginBottom: '15px'}}> Select User type:
            <DropdownButton style={{marginLeft: '8px'}}
              title={this.state.select}
              //key={i}
              id={`worker`}
              onSelect={this.handleUserClick.bind(this)}
            > 
              <MenuItem eventKey="0" active>User</MenuItem>
              <MenuItem eventKey="1">Worker</MenuItem>

            </DropdownButton>
            </div> 
        <form style={{marginTop: '10px', 'display': this.state.worker == '' ? 'none': 'block'}} className='form'>
          <label>
            <p style={{marginLeft: '60px'}}> Name: <input type="text" onChange={this.handleName.bind(this)} /> </p>
          </label> <br />
            <div style={{fontWeight: 'bold', marginLeft: '60px', marginBottom: '15px', 'display': this.state.worker == 'Worker' ? 'block': 'none'}}> Major:
            <DropdownButton style={{marginLeft: '8px', 'display': this.state.worker == 'Worker' ? 'block': 'none'}}
              title={this.state.major}
              //key={i}
              id={`major`}
              onSelect={this.handleMajor.bind(this)}
            > 
              <MenuItem eventKey="0" active>Electrician</MenuItem>
              <MenuItem eventKey="1">Plumber</MenuItem>
              <MenuItem eventKey="2">Painter</MenuItem>
              <MenuItem eventKey="3">Carpenter</MenuItem>
              <MenuItem eventKey="4">Gardener</MenuItem>
              <MenuItem eventKey="5">Furniture</MenuItem>

            </DropdownButton>
            </div> 
          <label>
            <p style={{marginLeft: '65px'}}> Email: <input type="email" onChange={this.handleEmail.bind(this)} /></p>
          </label> <br />
          <label>
            <p style={{marginLeft: '10px'}}> Phone Number: <input type="number" onChange={this.handlePhonenumber.bind(this)} /></p>
          </label> <br />
          <label>
            <p style={{marginLeft: '34px'}}> Username: <input type="text" onChange={this.handleUsername.bind(this)} /></p>
          </label> <br />
          <label>
            <p style={{marginLeft: '36px'}}> Password: <input type="password" onChange={this.handlePassword.bind(this)} /></p>
          </label> <br />
          <label>
            <p style={{marginLeft: '26px', 'display': this.state.worker == 'Worker' ? 'block': 'none'}}> Description: <input type="text" onChange={this.handleDescription.bind(this)} /></p>
          </label> <br />
          <label>
            <p style={{marginLeft: '36px'}}> Location: <input type="password" onChange={this.handlePassword.bind(this)} /></p>
            <p style={{marginLeft: '10px'}}> Phonenumber: <input type="number" onChange={this.handlePhonenumber.bind(this)} /></p>
            <p style={{marginLeft: '10px'}}> ProfilePicture: <input type="file" onChange={this.handleProfilePicture.bind(this)} /></p>
          </label> <br />
          <Button bsStyle="success" style={{marginLeft: '12%'}} onClick={this.handleSubmit.bind(this)}> Submit </Button>
        </form>
      </div>
    )
  }
}

export default Sign;