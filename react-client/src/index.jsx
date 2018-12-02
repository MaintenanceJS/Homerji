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
import map from "./components/maps.jsx";

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
      <div><WorkersLogo /></div>
      <div><Furniture /></div>
      <div><Electric /></div>
      <map />
      <div> <Painting /></div>
      <div> <Plump /></div>
      <div> <Carpenter /></div>
      <div><Gardener /></div>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
