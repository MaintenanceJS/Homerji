import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import NavBar from './NavBar.jsx';
import Carpenter from './carpenter.jsx';
configure({ adapter: new Adapter() });
// Snapshot testing is a pretty cool feature offered by Jest. It can memorize how your UI components are rendered,
// and compare it to the current test, raising an error if there’s a mismatch.
describe('Testing the Carpenter component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Carpenter />, div);
  });
  it('should render correctly in "debug" mode', () => {
	 	// In debug mode, Chainer checks values of variables on runtime and shows more detailed error messages.
	 	// It helps you to debug your programs. However, it requires some additional overhead time.
    const component = shallow(<Carpenter debug />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly with no props', () => {
    const component = shallow(<Carpenter/>);
    expect(component).toMatchSnapshot();
  });
  it('should render banner text correctly with given strings', () => {
    const strings = ['one', 'two'];
    const component = shallow(<Carpenter list={strings} />);
    expect(component).toMatchSnapshot();
  });
});

describe('Testing the NavBar component', () => {
	it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBar />, div);
  });
	it('should render correctly in "debug" mode', () => {
	 	// In debug mode, Chainer checks values of variables on runtime and shows more detailed error messages.
	 	// It helps you to debug your programs. However, it requires some additional overhead time.
    const component = shallow(<NavBar debug />);
  
    expect(component).toMatchSnapshot();
  });
  it('should render correctly with no props', () => {
    const component = shallow(<NavBar/>);
    expect(component).toMatchSnapshot();
  });
  it('should render banner text correctly with given strings', () => {
    const strings = ['one', 'two'];
    const component = shallow(<NavBar list={strings} />);
    expect(component).toMatchSnapshot();
  });
});

