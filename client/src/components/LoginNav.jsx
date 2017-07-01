import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Button from 'react-bootstrap/lib/Button'

import Login from './Login.jsx'
import Signup from './Signup.jsx'
import FacebookLogin from './FacebookLogin.jsx'

class LoginNav extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			showLoginModal: false,
			showSignUpModal: false
		};

		this.handleLogin = this.handleLogin.bind(this);
		this.closeLoginModal = this.closeLoginModal.bind(this);

		this.handleSignUp = this.handleSignUp.bind(this);
		this.closeSignUpModal = this.closeSignUpModal.bind(this);
	}

	handleLogin() {
		console.log('reached login')
		this.setState({
			showLoginModal: true,
			showSignUpModal: false
		})
	}

	handleSignUp() {
		console.log('reached signUp')
		this.setState({
			showLoginModal: false,
			showSignUpModal: true
		})
	}

	closeLoginModal() {
		console.log('reached close Modal')
		this.setState({
			showLoginModal: false
		})
	}

	closeSignUpModal() {
		console.log('reached close SignUp Modal')
		this.setState({
			showSignUpModal: false
		})
	}

	render () {

		if (this.props.promptLoginModal) {
			this.props.resetLoginModal()
			this.handleLogin()
		}

		if (this.props.login) {

			return (
				<Nav pullRight>
					<NavItem eventKey={1} onClick={this.props.handleSelectProfile}  href="#">#THIS IS USER</NavItem>
					<NavItem eventKey={1} onClick={this.props.logoutUser} href="#">Logout</NavItem>
	       		</Nav>
			)

		} else {
			return (
				<Nav pullRight>
	          		<NavItem eventKey={1} href="#" onClick={this.handleLogin}>Login</NavItem>
	          		<NavItem eventKey={2} href="#" onClick={this.handleSignUp} >Create Account</NavItem>
	          		<Modal show={this.state.showLoginModal} onHide={this.closeLoginModal} bsSize="lg" aria-labelledby="contained-modal-title-sm">
				        <Modal.Header closeButton>
				        	<Modal.Title id="contained-modal-title-sm">Login</Modal.Title>
				        </Modal.Header>
				        <Modal.Body>
				         	<Login closeLoginModal={this.closeLoginModal} login={this.props.login} loginUser={this.props.loginUser}/>
				        </Modal.Body>
				        <Modal.Footer>
				        	<FacebookLogin />
				         	<Button onClick={this.handleSignUp}>New User?</Button>
				        </Modal.Footer>
		      		</Modal>
		      		<Modal show={this.state.showSignUpModal} onHide={this.closeSignUpModal} bsSize="lg" aria-labelledby="contained-modal-title-sm">
				        <Modal.Header closeButton>
				        	<Modal.Title id="contained-modal-title-sm">Create Account</Modal.Title>
				        </Modal.Header>
				        <Modal.Body>
				         	<Signup closeSignUpModal={this.closeSignUpModal} login={this.props.login} loginUser={this.props.loginUser}/>
				        </Modal.Body>
				        <Modal.Footer>
				        	<FacebookLogin />
				         	<Button onClick={this.handleLogin}>Registered Users Login Here</Button>
				        </Modal.Footer>
		      		</Modal>

	       		</Nav>
			)
		}
	}
}

export default LoginNav
