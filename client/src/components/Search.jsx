import React from 'react'
import Button from 'react-bootstrap/lib/Button'
const $ = require('jquery');


class Search extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    	term: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(nextState) {
  	console.log(this.state.term)
  	 $.ajax({
      url: '/search',
      method: 'GET',
      data: {'param' : this.state.term},
      success: (data) => {
        console.log('success', data)
      },
      error: (err) => {
        console.log('error', err)
      }
    })
  }
  handleClick() {
  	var inpt = $('input').val()
  	if(inpt !== '') {
  		this.setState({
	  		term: inpt
	  	})
  	}
  }

  render(){
  	return (
  		<div>
  		<input type='text' />
  		<Button onClick={this.handleClick}> Search </Button>
  		</div>
  		)
  	}
	}

export default Search