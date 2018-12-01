import React from 'react';
import WorkerList from './workersList.jsx';
import $ from 'jquery';


class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false
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

  render() {
    return (
      <div>
        <h4 onClick={this.handleOnClick.bind(this)}> signup </h4>
        <form className='form'> 
          <label>
            Name:
            <br /><input type="text" />
          </label> <br />
          <label>
            Major:
            <br /><input type="text" />
          </label> <br />
          <label>
            Email:
            <br /><input type="text" />
          </label> <br />
          <label>
            Username:
            <br /><input type="text" />
          </label> <br />
          <label>
            Password:
            <br /><input type="text" />
          </label> <br />
          <label>
            Description:
            <br /><input type="text" />
          </label> <br />
          <label>
            Availability:
            <br /><input type="text" />
          </label> <br />
          <label>
            Phonenumber:
            <br /><input type="text" />
          </label> <br />
          <button> Submit </button>
        </form>
      </div>
    )
  }
}

export default Sign;