import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'
import Form from 'react-bootstrap/lib/Form'

const $ = require('jquery');


class Search extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    	term: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.getSearch = this.getSearch.bind(this);
    
  }
  getSearch() {
  	 $.ajax({
      url: '/search',
      method: 'GET',
      data: {'param' : this.state.term},
      success: (data) => {
        this.props.handleSearchRender(JSON.parse(data));
      },
      error: (err) => {
        console.log('error', err)
      }
    })
  }
  handleClick() {
  	var inpt = $('#input').val()
    console.log('inpt-->', inpt);
  	if(inpt !== '') {
  		this.setState({
	  		term: inpt
	  	}, this.getSearch)
  	}
  }

  render(){
  	return (
      <Form inline>
        <FormControl id='input' type="text" placeholder="Search by tags" />
  		  <Button bsStyle="primary" type='submit' onClick={this.handleClick}> Search </Button>
      </Form>
  		)
  	}
	}

export default Search