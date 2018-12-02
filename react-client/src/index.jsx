import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WorkersLogo from './components/workersLogo.jsx';
import WorkerName from './components/searchBarWorkers.jsx';
import Painting from './components/painting.jsx';
import Plump from './components/plump.jsx';
import Electric from './components/electric.jsx';
import Furniture from './components/forniture.jsx';
import Carpenter from './components/Carpenter.jsx';
import NavBar from "./components/NavBar.jsx";
import Gardener from "./components/Gardener.jsx";
// import Sign from "./components/Signup.jsx";
// import Login from "./components/Login.jsx";
// import Logout from "./components/logout.jsx";
//import Link from 'react-router-dom'
//import Router from 'react-router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



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
    return (
      <Router history={browserHistory}>
      <div>
        <Route path='/' component={NavBar} />
        <Link to="/Electric"><button className='btn btn-primary'>Electric</button></Link>
        <Link to="/Painting"><button className='btn btn-primary'>Painting</button></Link>
        <Link to="/Plump"><button className='btn btn-primary'>Plump</button></Link>
        <Link to="/Carpenter"><button className='btn btn-primary'>Carpenter</button></Link>
        <Link to="/Gardener"><button className='btn btn-primary'>Gardener</button></Link>
        <Link to="/Furniture"><button className='btn btn-primary'>Furniture</button></Link>

        <Route path='/Electric' component={Electric} />
        <Route path='/Painting' component={Painting} />
        <Route path='/Plump' component={Plump} />
        <Route path='/Carpenter' component={Carpenter} />
        <Route path='/Gardener' component={Gardener} />
        <Route path='/Furniture' component={Furniture} />
      </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//      <div><WorkersLogo /></div>
//        <NavBar />



