import React, { Component } from 'react';
import Toolbar from './Toolbar.jsx';
import Footer from './Footer.jsx';
import Slider from './Slider.jsx';

class Home extends React.Component {
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