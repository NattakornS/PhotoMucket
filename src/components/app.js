import React, {Component,PropTypes} from 'react';
import {
  PageHeader,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import {Link} from 'react-router';

export default class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  onRegisterClick(events){
    // console.log("onRegisterClick",events);
    this.context.router.push('/register');
  }
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Rekognition Demo</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem onClick={this.onRegisterClick.bind(this)}>Register</NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}
