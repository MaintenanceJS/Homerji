import React from 'react';
//import workersListRender from './workersListRender.jsx';
import $ from 'jquery';
import Dropdown from 'react-drop-down'

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      name: 'Unknown',
      major: 'Plumber',
      rating: 3,
      email: 'Unkown@unkown.com',
      username: 'Unkown',
      password: 'Unkown',
      description: 'Unkown',
      availability: 'yes',
      phonenumber: 0
    };
  }

  componentDidMount() {
    $('.form').hide()
    this.setState({
      shown: false
    })
  }

  handleOnClick() {
    this.setState({
      shown: !this.state.shown
    })
    if (!this.state.shown) {
      $('.form').show()
    } else {
      $('.form').hide()
    }
  }

  handleName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleMajor(e) {
    this.setState({
      major: e
    })
  }

  handleRating(e) {
    this.setState({
      rating: e.target.value
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

  handleSubmit() {
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
        phonenumber: this.state.phonenumber
      },
      success: (data) => {
        this.setState({
          getItems: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div>
        <h4 onClick={this.handleOnClick.bind(this)}> signup </h4>
        <form className='form'>
          <label>
            Name:
            <br /><input type="text" onChange={this.handleName.bind(this)} />
          </label> <br />
          <label>
            Major: <br />
            <Dropdown value={this.state.major}
              onChange={this.handleMajor.bind(this)}
              options={['Electrician', 'Plumber', 'Painter', 'Carpenter', 'Gardener']} />
          </label> <br />
          <label>
            Email:
            <br /><input type="text" onChange={this.handleEmail.bind(this)} />
          </label> <br />
          <label>
            Username:
            <br /><input type="text" onChange={this.handleUsername.bind(this)} />
          </label> <br />
          <label>
            Password:
            <br /><input type="text" onChange={this.handlePassword.bind(this)} />
          </label> <br />
          <label>
            Description:
            <br /><input type="text" onChange={this.handleDescription.bind(this)} />
          </label> <br />
          <label>
            Phonenumber:
            <br /><input type="text" onChange={this.handlePhonenumber.bind(this)} />
          </label> <br />

<form action='/api/images' method="post" enctype="multipart/form-data">
  <input type='file' name='image' />
</form>

          <button onClick={this.handleSubmit.bind(this)}> Submit </button>
        </form>
      </div>
    )
  }
}

export default Sign;



//<br /><input type="text" onChange={this.handleMajor.bind(this)}/>