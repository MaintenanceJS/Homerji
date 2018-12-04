import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./components/Login.jsx";
import { shallow } from 'enzyme';
import NavBar from "./components/NavBar.jsx";


// test('login submit test',() =>{
//     const handleSubmit = jest.fn()
//     const container = document.createElement('div')
//     ReactDOM.render(<Login onSubmit = {handleSubmit} />, container)

//     const form = container.querySelector('form')
//     const {username, password} = form.elements
//     username.value = "kjkfjgk";
//     password.value = "ffffff"

//     form.dispatchEvent(new window.event('submit'))

//     expect(handleSubmit).toHaveBeenCalledTimes(1);
//     expect(handleSubmit).toHaveBeenCalledWith({
//       username: username.value,
//       password: password.value,
//     });
// })

describe("NavBar", ()=>{
    it('rendering the navbar component', ()=>{
        const navbar = shallow(<NavBar />); 
        expect(navbar).toMatchSnapshot();
    });
});