import React from "react";
import Workers from "./workersLogo.jsx"
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    FormControl,
    Button
} from "react-bootstrap";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">HomerJi</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" />
                        </FormGroup> <Button type="submit">Submit</Button>
                    </Navbar.Form>
                    <Nav pullRight>
                        <NavItem href="#">
                            <Workers />
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    }
}
