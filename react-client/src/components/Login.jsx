import React from 'react';
import WorkerList from './workersList.jsx';
import $ from 'jquery';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false
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

  render() {
    return (
      <div>
        <h4 onClick={this.handleOnClick.bind(this)}> login </h4>
        <form className='login'> 
          <label>
            Username:
            <br /><input type="text" />
          </label> <br />
          <label>
            Password:
            <br /><input type="text" />
          </label> <br />
          <button> Submit </button>
        </form>
      </div>
    )
  }
}

export default Login;