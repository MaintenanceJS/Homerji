import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			passedFunction: props.passInputDataOrFunction
		};
	}
	handlePassedFunction(event) {
		this.props.passInputDataOrFunction(event)
	}

	render(){
		// this if statement and the else for the asynch props (render might be faster than getting the props)
		// you can uncomment them if you have this issue
		//if (this.props.firas.length > 0) {
			return (
			  <div>
			  <h1>list input input sample down</h1>
			  <input onChange={this.handlePassedFunction.bind(this)} />
			  </div>
		)} //else {
		// 	return (<div> estanna </div>)
		// }
	//}
}

export default List;


// you may use this in the render() function to pass array of data, item by item to an other component
//{this.state.items.map(item => <ListItem dana={item}/>)}
