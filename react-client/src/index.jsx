import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WorkersLogo from './components/workersLogo.jsx';
import Sign from './components/Signup.jsx';
import WorkerName from './components/searchBarWorkers.jsx';
import SearchBar from './components/searchBarWorkers.jsx';
import Login from './components/Login.jsx';
import Logout from './components/logout.jsx';
import Painting from './components/painting.jsx';
import Plump from './components/plump.jsx';
import Electric from './components/electric.jsx';
import Furniture from './components/forniture.jsx';
import Others from './components/others.jsx';
import NavBar from "./components/NavBar.jsx";
// uncomment this when using the frontend routers
// import { Router, Route, Switch } from 'react-router'
// import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getItems: [],
      postItems: [],
      name: ''
    }
  }

  sendData(data) {
    $.ajax({
      type: 'POST',
      url: '/name',
      data: { name: data },
      success: (data) => {
        this.setState({
          postItems: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  clickHandle() {
    this.sendData(this.state.name)
    $('#name').val('')
  }

  inputHandle(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return (<div>
      <NavBar />
      <Sign />
      <Login />
      <Logout />
      <div><WorkersLogo /></div>
      <div><Furniture /></div>
      <div><Electric /></div>
      <div> <Painting /></div>
      <div> <Plump /></div>
      <div> <Others /></div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));