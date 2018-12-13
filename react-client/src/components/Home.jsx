import React, { Component } from 'react';
import Toolbar from './Toolbar.jsx';
import Footer from './Footer.jsx';
import Slider from './Slider.jsx';
import NavBar from './NavBar.jsx';

class Home extends React.Component {
  render() {

    return (
      <div style={{ height: '100%' }}>
        
        <main style={{ marginTop: '-20px' }}>
          <div><Slider /></div>
        </main>
        <div style={{ marginTop: '0px' }}>
        <Footer />
        </div>
       
      </div>
    );
  }
}

export default Home;