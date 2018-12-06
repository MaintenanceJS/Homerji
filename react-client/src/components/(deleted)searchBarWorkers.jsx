// import React from 'react';
// import axios from 'axios'; // Promise based HTTP client for the browser and node.js
// import Workers from './workers.jsx'; // Mid component to map workers tickets
// import $ from 'jquery';
// import {
//     Navbar,
//     Nav,
//     NavItem,
//     FormGroup,
//     FormControl,
//     Button,
//     Glyphicon,
//     Modal
// } from "react-bootstrap"; // For Designing

// class Example extends React.Component {
//   constructor(props, context) {
//     super(props, context);

//     this.handleShow = this.handleShow.bind(this);
//     this.handleClose = this.handleClose.bind(this);

//     this.state = {
//       show: false
//     };
//   }

//   handleClose() {
//     this.setState({ show: false });
//   }

//   handleShow() {
//     this.setState({ show: true });
//   }

//   render() {
//     return (
//       <div>
//         <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
//           Launch demo modal
//         </Button>

//         <Modal show={this.state.show} onHide={this.handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <h4>Text in a modal</h4>
//             <p>
//               Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//             </p>

//             <h4>Popover in a modal</h4>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={this.handleClose}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default Example;