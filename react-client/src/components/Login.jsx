import React from 'react';
import WorkerList from './workersList.jsx';
import $ from 'jquery';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    $('.login').hide()
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
          getItems: data
        })
      },
      error: (err) => {
        console.log('err', err);
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

  render() {
    return (
      <div>
        <h4 onClick={this.handleOnClick.bind(this)}> login </h4>
        <form className='login'>
          <label>
            Username:
            <br /><input type="text" onChange={this.handleUsername.bind(this)} />
          </label> <br />
          <label>
            Password:
            <br /><input type="text" onChange={this.handlePassword.bind(this)} />
          </label> <br />
          <button onClick={this.handleSubmit.bind(this)}> Submit </button>
        </form>
      </div>
    )
  }
}

export default Login;