import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
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
      getItems: [],
      postItems: [],
      name: '',
      show: false
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

  handleWorkersButton() {
    console.log("in handle workers")
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    if (this.state.show) {
      return <Router history={browserHistory}>

        <div>
          <Route path="/" component={() => <NavBar handleWorkersButton={this.handleWorkersButton.bind(this)} />} />
          <Sign className="show" />
          <Login className="show" />
          <Logout className="show" />
        </div>
      </Router>;
    } else {
      return <Router history={browserHistory}>
        <div>
          <Route path="/" component={() => <NavBar handleWorkersButton={this.handleWorkersButton.bind(this)} />} />
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



      </Router>
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


//   <img src=imageURL />


          // <form action='/api/images' method="post" enctype="multipart/form-data">
          //   <input type='file' name='image' />
          // </form>






