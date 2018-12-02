import React from "react";
import Workers from "./workersLogo.jsx";
import SearchByName from "./searchbyname.jsx";
import axios from "axios";
import $ from "jquery";
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      name: "",
      workers: []
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getWorkersByName() {
    $("button, input, h1, h4").hide();
    var that = this;
    axios.post("/name", { name: this.state.name }).then(function(res) {
      that.setState({
        workers: res.data
      });
    });
  }

  getUserName(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">HomerJi</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Search"
                  onChange={this.getUserName.bind(this)}
                />
              </FormGroup>{" "}
              <Button onClick={this.getWorkersByName.bind(this)}>Search</Button>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem href="#">
                <Workers />
              </NavItem>
              <NavItem>
                <a href="/Register">WORKERS</a>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <SearchByName workersList={this.state.workers} />
      </div>
    );
  }
}
