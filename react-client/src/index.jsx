import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Workers from './components/workersLogo.jsx';

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

  // componentDidMount() {
  //   $.ajax({
  //     url: '/workers',
  //     success: (data) => {
  //       this.setState({
  //         getItems: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

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
      <Workers />
      <h1 className='head1'>Item List</h1>
      <input id="name" onChange={this.inputHandle.bind(this)} />
      <h4 id='head2'> {this.state.input} </h4>
      <button onClick={this.clickHandle.bind(this)}> sendName </button>
      <List passInputDataOrFunction={this.inputHandle.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));