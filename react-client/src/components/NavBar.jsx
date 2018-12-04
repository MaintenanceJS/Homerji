import React from "react";
import WorkersLogo from "./workersLogo.jsx";
import SearchByName from "./workers.jsx";
import axios from "axios";
import $ from "jquery";
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  Button,
  NavDropdown,
  MenuItem
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", //search bar
      workers: [] //searched workers
    };
  }

  // For the search
  getWorkersByName() {
    var that = this;
    axios.post("/name", { name: this.state.name }).then(function (res) {
      that.setState({
        workers: res.data
      });
      $('#textInbox').val('') //to empty the input box
      $('.home').hide() //categories buttons on index file
    });
  }

  getUserName(e) {
    this.setState({
      name: e.target.value //search bar value
    });
  }

  render() {
    return (
      <Router>
        <div>

          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">HomeRG</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/contactus">
                  Contact Us
                </NavItem>
                <NavItem eventKey={2} href="#">
                  About
                </NavItem>
              </Nav>
              <Navbar.Form>
                <FormGroup>
                  <FormControl
                    id='textInbox'
                    type="text"
                    placeholder="Username"
                    onChange={this.getUserName.bind(this)}
                  />
                </FormGroup>{" "}
                <Link to="/search">
                  <Button onClick={this.getWorkersByName.bind(this)}>
                    Search
                  </Button>

                </Link>
              </Navbar.Form>
              <WorkersLogo />
              <Route
                path="/search"
                component={() => <SearchByName workersList={this.state.workers} />}
              />
            </Navbar.Collapse>
          </Navbar>;
        </div>
      </Router>
    );
  }
}

export default NavBar;
