import React from 'react'
import NavB from './Nav.jsx'
import Listings from './Listings.jsx'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import $ from 'jquery'

class Login extends React.Component{
	constructor (props) {
		super (props)

		this.state = {
			username: '',
			password: ''
		}

		this.login = this.login.bind(this)
		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
	}

	handleUsername (event) {
		this.setState({
			username: event.target.value
		})
	}

	handlePassword (event) {
		this.setState({
			password: event.target.value
		})
	}

	login () {

		this.props.closeLoginModal()
		var loginUser = this.props.loginUser
		console.log('In Login.jsx', this.state.username, this.state.password)
		var username = this.state.username
		var password = this.state.password
		$.ajax({
			url: 'http://127.0.0.1:3000/login',
			method: 'POST',
			data: {
				'username': username,
				'password': password
			},
			success: (data) => {
				console.log('success', data)
				loginUser()
			},
			error: (err) => {
				console.log('error', err)
			} 
		})

	}

	render () {
		return (
			<Form horizontal  onSubmit={this.login} >
			    <FormGroup controlId="formHorizontalEmail">
			      <Col componentClass={ControlLabel} sm={2}>
			        Username
			      </Col>
			      <Col sm={10}>
			        <FormControl type="Username" value={ this.state.username } placeholder="username" onChange={this.handleUsername} />
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formHorizontalPassword">
			      <Col componentClass={ControlLabel} sm={2}>
			        Password
			      </Col>
			      <Col sm={10}>
			        <FormControl type="password" placeholder="Password" value={ this.state.password } onChange={this.handlePassword} />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col smOffset={2} sm={10}>
			        <Button type="submit" >
			          Login
			        </Button>
			      </Col>
			    </FormGroup>
			</Form>
		)
	}
}

export default Login
