import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // Promise based HTTP client for the browser and node.js
import contactUs from './components/contactUs.jsx';
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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, //to see categories or signup and login page
      selectedFile: null
    }
  }

  //toggle
  handleWorkersButton() {
    this.setState({
      show: !this.state.show
    })
  }


  render() {
    if (this.state.show) { //to see signup and login page
      return <Router history={browserHistory}>
        <div style={{ cursor: 'auto' }}>
          <Route path="/" component={() => <NavBar handleWorkersButton={this.handleWorkersButton.bind(this)} />} />
          <div className="col" >
            <div className="col-sm-4 col-md-3">
              <Sign className="show" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div className="col">
            <div className="col-sm-4 col-md-3">
              <Login className="show" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div className="col">
            <div className="col-sm-3 col-md-3">
              <Logout className="show" />
            </div>
          </div>
        </div>
      </Router>;


    } else { //to see categories
      return <Router history={browserHistory}>
        <div style={{ cursor: 'auto' }}>
          <Route path="/" component={() => <NavBar handleWorkersButton={this.handleWorkersButton.bind(this)} />} />
          <div style={{ "width": "100%" }}>
            <Link to="/Electric">
              <button className="">Electric</button>
            </Link>
            <Link to="/Painting">
              <button className="">Painting</button>
            </Link>
            <Link to="/Plumb">
              <button className="">Plumb</button>
            </Link>
            <Link to="/Carpenter">
              <button className="">Carpenter</button>
            </Link>
            <Link to="/Gardener">
              <button className="">Gardener</button>
            </Link>
            <Link to="/Furniture">
              <button className="">Furniture</button>
            </Link>
            <Link to="/contactus">
              <button className="">Contact Us</button>
            </Link>


            <input name="file" type="file"
              className="file-upload" data-cloudinary-field="image_id"
              data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}" />

            <Route path='/contactus' component={contactUs} />
            <Route path='/Electric' component={Electric} />
            <Route path='/Painting' component={Painting} />
            <Route path='/Plumb' component={Plumb} />
            <Route path='/Carpenter' component={Carpenter} />
            <Route path='/Gardener' component={Gardener} />
            <Route path='/Furniture' component={Furniture} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Sign} />
            <Route path='/logout' component={Logout} />


          </div>
        </div>
      </Router>;
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// handleFileUpload(e) {

//   const file = e.target.files[0];
//   this.setState({
//     selectedFile: file
//   });

// }


// imageUploadHandler(event) {
//   const data = new FormData();
//   data.append('file', event.target.files[0]);
//   data.append('name', 'some value user types');
//   data.append('description', 'some value user types');
//   // '/files' is your node.js route that triggers our middleware
//   axios.post('/files', data).then((response) => {
//     console.log(response); // do something with the response
//   });
// }

  // * /





