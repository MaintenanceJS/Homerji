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
import workerProfile from "./components/workerProfile.jsx"
import ContactUs from "./components/contactUs.jsx";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { browserHistory } from "react-router";
import HomeLinks from "./components/HomeLinks.jsx"
import Image from "./components/Image.jsx"
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

  componentDidMount(){
    console.log(this.state)
  }

  render() {

    if (this.state.show) { //to see signup and login page
      return <Router history={browserHistory}>
        <div style={{ cursor: 'auto' }}>
          <Route path="/" component={() => <NavBar handleWorkersButton={this.handleWorkersButton.bind(this)} />} />
          <Tabs defaultActiveKey={1} animation={false} id="HomerG">
            <Tab eventKey={1} title="Signup" animation>
              <Sign className="show" style={{ cursor: 'pointer' }} />
            </Tab>
            <Tab eventKey={2} title="Login" animation>
              <Login className="show" style={{ cursor: 'pointer' }} />
            </Tab>
            <Tab eventKey={3} title="Logout" onEnter={this.logout.bind(this)} animation> </Tab>
          </Tabs>
        </div>
      </Router>;
    } else { //to see categories
      return (



        <BrowserRouter>

          <div className="App">

            <NavBar />
            <Switch>

              )}}
            />
              <Route exact path ='/' component={HomeLinks}/>
              <Route exact path='/electric' component={Electric} exact />
              <Route exact path='/gardens' component={Gardener} />
              <Route exact path='/paintinig' component={Painting} exact />
              <Route exact path='/pulmbers' component={Plumb} />
              <Route exact path='/carpenters' component={Carpenter} exact />
              <Route exact path='/furniture' component={Furniture} />
              <Route exact path='/y' component={Image} />

            </Switch>


          </div>

        </BrowserRouter>
      )
    }
  }
}
export default App;
ReactDOM.render(<App />, document.getElementById('app'));
