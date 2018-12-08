import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Painting from './components/painting.jsx';
import Plumb from './components/plumb.jsx';
import Electric from './components/electric.jsx';
import Furniture from './components/Furniture.jsx';
import Carpenter from './components/Carpenter.jsx';
import NavBar from "./components/NavBar.jsx";
import Gardener from "./components/Gardener.jsx";
import Sign from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import ContactUs from "./components/contactUs.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button,
    Glyphicon,
    Tab,
    Tabs
} from "react-bootstrap"; // For Designing
import ScrollIntoView from 'react-scroll-into-view'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, //to see categories or signup and login page
      selectedFile: null,
      categories: false
    }
  }

  //logout function
  logout() {
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: () => { 
        window.location.reload();       
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  //toggle worker button
  handleWorkersButton() {
    this.setState({
      show: !this.state.show
    })
  }

  handleScroll() {
    this.scrollToBottom()
  }

  render() {
    if (this.state.show) { //to see signup and login page
    return <Router history={browserHistory}>
        <div style={{cursor: 'auto'}}>
          <Route path="/" component={() => <NavBar handleWorkersButton={this.handleWorkersButton.bind(this)} />} />
          <Tabs defaultActiveKey={1} animation={false} id="HomerG">
            <Tab eventKey={1} title="Signup" animation>
                <Sign className="show" style={{cursor: 'pointer'}}/>
            </Tab>
            <Tab eventKey={2} title="Login" animation>
                <Login className="show" style={{cursor: 'pointer'}}/> 
            </Tab>
            <Tab eventKey={3} title="Logout" onEnter={this.logout.bind(this)} animation> </Tab>
          </Tabs>
        </div>
      </Router>;
    } else { //to see categories
      return <Router history={browserHistory}>
        <div style={{ cursor: "auto" }}>
          <Route path="/" component={() => <NavBar handleWorkersButton={this.handleWorkersButton.bind(this)} />} />
          <div id="logos" style={{ maxWidth: "1200px", margin: "auto", padding: "10px" }}>
            <div className="container-fluid" style={{ marginTop: "40px" }}>
              <div className="row" style={{ marginTop: "20px" }}>
                <ScrollIntoView selector="#major">
                <Link style={{ textDecoration: "none" }} to="/Electric">
                  <div className="col-md-4">
                    <div className="col-lg-10 feature-box">
                      <span className="yellow glyphicon glyphicon-flash icon" />
                      <h4>Electricians</h4>
                    </div>
                  </div>
                </Link>
                </ScrollIntoView>
                <ScrollIntoView selector="#major">
                <Link style={{ textDecoration: "none" }} to="/Painting">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="glyphicon glyphicon-cog icon"/>
                      <h4>Painting</h4>
                    </div>
                  </div>
                </Link>
                </ScrollIntoView>
                <ScrollIntoView selector="#major">
                <Link style={{ textDecoration: "none" }} to="/Plumb">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="glyphicon glyphicon-cog icon" />
                      <h4>Plumbers</h4>
                    </div>
                  </div>
                </Link>
                </ScrollIntoView>
                <ScrollIntoView selector="#major">
                <Link style={{ textDecoration: "none" }} to="/Carpenter">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="glyphicon glyphicon-cog icon" />

                      <h4>Carpenters</h4>
                    </div>
                  </div>
                </Link>
                </ScrollIntoView>
                <ScrollIntoView selector="#major">
                <Link style={{ textDecoration: "none" }} to="/Gardener">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="green glyphicon glyphicon-tree-deciduous icon" />
                      <h4>Gardeners</h4>
                    </div>
                  </div>
                </Link>
                </ScrollIntoView>
                <ScrollIntoView selector="#major">
                <Link style={{ textDecoration: "none" }} to="/Furniture">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="glyphicon glyphicon-lamp icon" />
                      <h4>Furniture Services</h4>
                    </div>
                  </div>
                </Link>
                </ScrollIntoView>
              </div>
            </div>
          </div>
          <Route path="/Electric" component={Electric} />
          <Route path="/Painting" component={Painting} />
          <Route path="/Plumb" component={Plumb} />
          <Route path="/Carpenter" component={Carpenter} />
          <Route path="/Gardener" component={Gardener} />
          <Route path="/Furniture" component={Furniture} />
          <div id='major'>
          </div>
        </div>
      </Router>;
    }
  }
}
export default App;
ReactDOM.render(<App />, document.getElementById('app'));
