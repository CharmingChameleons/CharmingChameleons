import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import LoginNav from './LoginNav.jsx'

class NavB extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a  onClick={this.props.onLogoClick}>$hare.io</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onClick={this.props.onCreateClick} href="#">Create Listing</NavItem>
            </Nav>
            <LoginNav
              login={this.props.login}
              loginUser={this.props.loginUser}
              logoutUser={this.props.logoutUser}
              promptLoginModal={this.props.promptLoginModal}
              resetLoginModal={this.props.resetLoginModal}
              handleSelectProfile={this.props.handleSelectProfile}
              currentUsername={this.props.currentUsername}
              />
          </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default NavB
