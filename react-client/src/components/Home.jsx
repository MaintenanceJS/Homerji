import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Footer from "./Footer";
import Slider from './Slider';

class Home extends Component {
  render() {

    return (
      <div style={{ height: '100%' }}>
        <Toolbar />
        <main style={{ marginTop: '55px' }}>
          <div><Slider /></div>
        </main>
        <div style={{ marginTop: '-60px' }}>
        <Footer />
        </div>
       
      </div>
    );
  }
}

export default Home;