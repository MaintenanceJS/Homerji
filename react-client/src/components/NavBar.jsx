import React from "react";
import WorkersLogo from "./workersLogo.jsx";
import SearchByName from "./workers.jsx";
import axios from "axios";
import $ from "jquery";
import ContactUs from './contactUs.jsx';
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  Button,
  Glyphicon
} from "react-bootstrap"; // For Designing
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

  handle() {

  }

  render() {
    return (
      <Router>
        <div>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/" >HomerJi</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/contact">
                  Contact Us
                </NavItem>
                <NavItem eventKey={2} href="/about">
                  About
                </NavItem>
              </Nav>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl
                    id='textInbox'
                    type="text"
                    placeholder="Worker name"
                    onChange={this.getUserName.bind(this)}
                  />
                </FormGroup>{" "}
                <Link to="/search">
                  <Button onClick={this.getWorkersByName.bind(this)}>
                    Search
                  </Button>
                </Link>
              </Navbar.Form>
              <Nav pullRight>
                <NavItem href="#">
                  <div>
                    {" "}
                    <WorkersLogo
                      handleWorkersButton={this.props.handleWorkersButton}
                    />{" "}
                  </div>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route
            path="/search"
            component={() => <SearchByName workersList={this.state.workers} />}
          />
        </div>
      </Router>

    );
  }
}

export default NavBar;
