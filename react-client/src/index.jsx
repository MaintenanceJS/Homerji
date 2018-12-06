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
import Logout from "./components/logout.jsx";
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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, //to see categories or signup and login page
      selectedFile: null
    }
  }

  logout() {
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: () => {        
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  //toggle
  handleWorkersButton() {
    this.setState({
      show: !this.state.show
    })
  }

  handleClients() { // Worker profile editing after login
    $.ajax({
      type: 'POST',
      url: '/show',
      data: { username: this.state.username },
      contentType: 'application/json',
      success: (data) => {
        console.log('data', data)
        alert(data)
        // this.setState({
        //   clients: data
        // })
      },
      error: (err) => {
        console.log('err', err);
        alert('err')
      }
    });

  }

  handleMyClick() {
    $.ajax({
      type: 'POST',
      url: '/show',
      data: { username: 'g' },
      success: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log('err', err);
      }
    });
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
            <Tab className='container' eventKey={2} title="Login" animation>
                <Login className="show" style={{cursor: 'pointer'}}/> 
            </Tab>
            <Tab className='container' eventKey={3} title="Logout" onEnter={this.logout.bind(this)} animation>
                <Logout className="show"/>
            </Tab>
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
                <Link style={{ textDecoration: "none" }} to="/Electric">
                  <div className="col-md-4">
                    <div className="col-lg-10 feature-box">
                      <span className="yellow glyphicon glyphicon-flash icon" />
                      <h4>Electric</h4>
                    </div>
                  </div>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/Painting">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="glyphicon glyphicon-cog icon"/>
                      <h4>Painting</h4>
                    </div>
                  </div>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/Plumb">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="glyphicon glyphicon-cog icon" />
                      <h4>Plumb</h4>
                    </div>
                  </div>
                </Link>

                <Link style={{ textDecoration: "none" }} to="/Carpenter">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="glyphicon glyphicon-cog icon" />

                      <h4>Carpenter</h4>
                    </div>
                  </div>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/Gardener">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="green glyphicon glyphicon-tree-deciduous icon" />
                      <h4>Gardener</h4>
                    </div>
                  </div>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/Furniture">
                  <div className="col-md-4">
                    <div className="col-md-10 feature-box">
                      <span className="glyphicon glyphicon-lamp icon" />

                      <h4>Furniture</h4>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Route path="/Electric" component={Electric} />
          <Route path="/Painting" component={Painting} />
          <Route path="/Plumb" component={Plumb} />
          <Route path="/Carpenter" component={Carpenter} />
          <Route path="/Gardener" component={Gardener} />
          <Route path="/Furniture" component={Furniture} />
        </div>
      </Router>;
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
