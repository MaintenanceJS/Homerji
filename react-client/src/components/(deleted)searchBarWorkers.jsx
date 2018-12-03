// import React from 'react';
// import axios from 'axios';
// import Worker from './workers.jsx';
// import $ from 'jquery';

// class WorkersNames extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             workers: [],
//             name: ''
//         };
//     }
//     // get a worker information from the database
//     getWorkersByName() {
//         $('button, input, h1').hide();
//         var that = this;
//         axios.post('/name', { name: this.state.name })
//             .then(function (res) {
//                 that.setState({
//                     workers: res.data
//                 })
//             })
//     }

//     getUserName(e) {
//         this.setState({
//             name: e.target.value

//         })
//     }


//     render() {
//         return (
//             <div>
//                 <input type='text' onChange={this.getUserName.bind(this)} />
//                 <button onClick={this.getWorkersByName.bind(this)}>search</button>
//                 <Worker workersList={this.state.workers} />
//             </div>
//         )
//     }
// }

// export default WorkersNames;

