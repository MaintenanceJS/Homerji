import React from 'react';
import $ from 'jquery';
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button,
    Glyphicon
} from "react-bootstrap";
import Dropdown from 'react-drop-down'

class ListWrkersName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: [],
      rate: Math.ceil(this.props.item.rating),
      rating: 0
    };
  }

  handleRate (e) {
    this.setState({
      rating: e
    })
  }

  handleRateClick() {
    $.ajax({
      type: 'POST',
      url: '/rating',
      data: { rating: this.state.rating, username: this.props.item.username},
      success: (data) => {
        
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div style={{margin: '10px', textAlign:'center'}}>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail" style={{'border':'red'}}>
              <img src="..." alt="..." />
              <div className="caption">
                <h3>{this.props.item.username}</h3>
                Name: {this.props.item.name} <br/>
                Major:{this.props.item.major}<br/>
                Rating:{Math.ceil(this.props.item.rate)}<br/>
                Email:{this.props.item.email}<br/>
                Description: {this.props.item.description}<br/>
                Phonenumber: {this.props.item.phonenumber}
                <p><Dropdown value={'3'}
                  onChange={this.handleRate.bind(this)}
                  options={[ '0', '1', '2', '3', '4', '5']} /><a href="#" className="btn btn-primary" role="button" onClick={this.handleRateClick.bind(this)}>Rate</a>  
                  <a href="#" className="btn btn-default" role="button">Button</a></p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListWrkersName;


    