import React from "react";
import WorkersLogo from "./workersLogo.jsx";
import SearchByName from "./searchbyname.jsx";
import axios from "axios";
import $ from "jquery";
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
      name: "",
      workers: []
    };
  }

  // For the search in 
  getWorkersByName() {
    $("button, h1, h4").hide();
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
      <Router>
        <div>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/" >HomerJi</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl
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
