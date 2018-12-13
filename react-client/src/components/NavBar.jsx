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
 Button
} from "react-bootstrap"; // For Designing
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ContactUs from "./contactUs.jsx";
import About from "./About.jsx";
import Sign from "./Signup.jsx";



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
     $('#logos').hide() //categories buttons on index file
   });
 }

  //get the value of the search bar
  getUserName(e) {
    this.setState({
      name: e.target.value //search bar value
    });
  }

  hideCategories() {
    console.log('here')
    $('#logos').hide() //categories buttons on index file
  }
  
  render() {
    return (
      <Router>
        <div >
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/" >HomerG</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav style={{ height: '5px' }}>
                <NavItem  href="/contact">
                  Contact Us
                </NavItem>
             
              </Nav>
            <Navbar.Form pullLeft style={{ marginRight: '50px' }}>
              <FormGroup >
                <FormControl onKeyUp={function(event) {
                  event.preventDefault();
                  if (event.keyCode === 13) {
                  $("#myBtn").click();
                  }
                  }} id="textInbox" type="text" placeholder="Worker name" onChange={this.getUserName.bind(this)} />
              </FormGroup> <Link to="/search">
                <Button  id="myBtn" onClick={this.getWorkersByName.bind(this)}>
                  Search
                  </Button>
              </Link>
            </Navbar.Form>
            <Nav pullRight>
              <NavItem href="#">
                <div>
                
                  <WorkersLogo
                    handleWorkersButton={this.props.handleWorkersButton}
                  />
                </div>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route
          path="/search"
          component={() => <SearchByName workersList={this.state.workers} />}
        />
        <Route path="/contact" component={ContactUs}/>
        <Route path="/about" component={About}/>
        
    </div>
  </Router>)
  }
}
 export default NavBar;