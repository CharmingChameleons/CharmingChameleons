import React from 'react'
import NavB from './Nav.jsx'
import Listings from './Listings.jsx'
import Signup from './Signup.jsx'

class App extends React.Component {
	constructor (props) {
		super (props)
	}

	render () {
		return (
			  <div>
			    <NavB/>
			    <Listings/>
			    <Signup />
			  </div>
		)
	}
}

export default App
