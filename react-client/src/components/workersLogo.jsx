import React from "react";
import axios from "axios";
import $ from "jquery";
import Sign from "./Signup.jsx";
import Login from "./Login.jsx";
import Logout from "./logout.jsx";

class Workers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {}

  handleButton() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    if (this.state.show) {
      return (
        <div>
          <button onClick={this.getAllWorkers.bind(this)}>
            {" "}
            Register & Login
          </button>
          <button onClick={this.handleButton.bind(this)}> Workers </button>
          <Sign className="show" />
          <Login className="show" />
          <Logout className="show" />
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.handleButton.bind(this)}> Workers </button>
        </div>
      );
    }
  }
}

export default Workers;
