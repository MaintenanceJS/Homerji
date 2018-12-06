import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // Promise based HTTP client for the browser and node.js
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

  handleClients() { // Worker profile editing after login
    $.ajax({
      type: 'POST',
      url: '/show',
      data: {username: this.state.username},
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
      data: {username: 'g'},
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
          <div className="col" >
            <div className="col-sm-4 col-md-3">
                <Sign className="show" style={{cursor: 'pointer'}}/>
            </div>
          </div>
          <div className="col">
            <div className="col-sm-4 col-md-3">
                <Login className="show" style={{cursor: 'pointer'}}/> 
            </div>
          </div>
          <div className="col">
            <div className="col-sm-3 col-md-3">
                <Logout className="show"/>
            </div>
          </div>
        </div>
      </Router>;
    } else { //to see categories
      return <Router history={browserHistory}>
        <div style={{cursor: 'auto'}}>
          <Route path="/" component={() => <NavBar handleWorkersButton={this.handleWorkersButton.bind(this)} />} />
          <div style={{"width": "100%"}}>
          <Link to="/Electric">
            <button className="home btn btn-primary">Electric</button>
          </Link>
          <Link to="/Painting">
            <button className="home btn btn-primary">Painting</button>
          </Link>
          <Link to="/Plumb">
            <button className="home btn btn-primary">Plumb</button>
          </Link>
          <Link to="/Carpenter">
            <button className="home btn btn-primary">Carpenter</button>
          </Link>
          <Link to="/Gardener">
            <button className="home btn btn-primary">Gardener</button>
          </Link>
          <Link to="/Furniture">
            <button className="home btn btn-primary">Furniture</button>
          </Link>
          </div>

<button onClick={this.handleMyClick.bind(this)}> clients </button>


        <Route path='/Electric' component={Electric} />
        <Route path='/Painting' component={Painting} />
        <Route path='/Plumb' component={Plumb} />
        <Route path='/Carpenter' component={Carpenter} />
        <Route path='/Gardener' component={Gardener} />
        <Route path='/Furniture' component={Furniture} />
      </div>
      </Router>
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));



/*

<input type="file" onChange={this.handleFileUpload} />

         
            <button onClick={this.imageUploadHandler.bind(this)}> send image</button>


  <img src=imageURL />
<input type='submit' name='image' />

  <input type='file' name='image' onChange={this.imageHandler.bind(this)}/>

  imageHandler(e) {
    console.log(e.target)
    this.setState({
      selectedFile: e.target.files[0]
    })
  }


  handleFileUpload(e) {
    console.log(e)
    const file = e.target.files[0];
    // this.props.actions.uploadRequest({
    //    file,
    //    name: 'Awesome Cat Pic'
    // })
    this.setState({
      selectedFile: file
    })
  }

  imageUploadHandler(event) {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
    // '/files' is your node.js route that triggers our middleware
    axios.post('/files', data).then((response) => {
      console.log(response); // do something with the response
    });
  }

  */





