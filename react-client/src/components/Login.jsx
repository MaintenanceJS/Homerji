import React from 'react';
import WorkerList from './workersList.jsx';
import $ from 'jquery';
import Dropdown from 'react-drop-down'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      username: '',
      password: '',
      loggedin: false,
      major: 'Plumber',
      name: '',
      email: '',
      password: '',
      description: '',
      phonenumber: 0
    };
  }

  componentDidMount() {
    $('.login, .edit').hide()
    if (this.state.loggedin === true) {
      $('.edit').show()
    }
    this.setState({
      shown: false
    })
  }

  handleOnClick() {
    this.setState({
      shown: !this.state.shown
    })
    if (!this.state.shown) {
      $('.login').show()
    } else {
      $('.login').hide()
    }
  }

  handleSubmit() {
    $.ajax({
      type: 'POST',
      url: '/login',
      data: { username: this.state.username, password: this.state.password },
      success: (data) => {
        this.setState({
          loggedin: true
        })
        $('.edit').show()
      },
      error: (err) => {
        alert('err');
        console.log(err)
      }
    });
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

  handleEdit() {
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

        <h4 onClick={this.handleOnClick.bind(this)}> login </h4>

          <label>
            Username:
            <br /><input type="text" onChange={this.handleUsername.bind(this)} />
          </label> <br />
          <label>
            Password:
            <br /><input type="text" onChange={this.handlePassword.bind(this)} />
          </label> <br />
          <button onClick={this.handleSubmit.bind(this)}> Submit </button>

          <form className='edit'>
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
          <button onClick={this.handleEdit.bind(this)}> Submit </button>
        </form>
        

      </div>
    )
  }
}

export default Login;