import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'

const $ = require('jquery');

class Search extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    	term: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.submit = this.submit.bind(this);

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
  	var input = $('#input').val()
		this.setState({ term: input }, this.getSearch);
  }

  submit(e) {
    e.preventDefault();
    this.handleClick();
  }

  render(){
  	return (
      <Form inline id='search-form' onSubmit={this.submit}>
        <FormGroup bsSize="large">
          <FormControl id='input' type="text" placeholder="Search by tags" />
          {' '}
          <Button type="button" bsStyle="primary" onClick={this.handleClick}> Search </Button>
        </FormGroup>

      </Form>
  		)
  	}
	}

export default Search
