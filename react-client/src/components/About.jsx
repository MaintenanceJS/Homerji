import React from 'react';
import {
 Button,
 Modal,
} from "react-bootstrap";

class About extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     show: true,
   };
 }

 handleClose() {
   this.setState({
     show: false
   });
 }

 render() {
   return (
     <div>
       <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
         <Modal.Body style={{width: '100%',textAlign: 'left',color: '#323232',fontFamily: "Monospace",fontSize: '20px'}}>
             <img src="https://svgsilh.com/svg_v2/2789573.svg" style={{ width: "50px", height: '70px', background: 'white' }} />
             <h3 style={{ marginTop: '-30px', textAlign: 'center', fontWeight: "bold" }}>HomerG</h3> <br /> <p style={{ textAlign: 'left' }}>Is the <b style={{ color: 'black' }}>#1</b> home maintenance web application that connecting homeowners with home service contractors.</p><br />
             <p> You can easily find a contractor specialized in more than 10 services from our web application by scheduling an
              appointment that suits your time.</p>
             <b style={{ color: 'black' }}>★HomerG</b> lets you discover and compare contractors ratings from real customers.
            home maintenance and renovation is now easier than ever with HomerG.
         </Modal.Body>
         <Modal.Footer style={{ marginTop: '10px', textAlign: 'center' }}>
           <Button onClick={this.handleClose.bind(this)}>Close</Button>
         </Modal.Footer>
       </Modal>
     </div>
   );
 }
}
export default About;





