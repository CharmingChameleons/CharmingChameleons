import React from 'react'
import NavB from './Nav.jsx'
import Listings from './Listings.jsx'
import SelectedListing from './SelectedListing.jsx'
import Signup from './Signup.jsx'
var $ = require('jquery');


class App extends React.Component {
	constructor (props) {
		super(props);
    this.state = {
    	currentRender: 'landing',
      listings: [],
      listing: {}
    };
	}

	currentRender() {
		var render = this.state.currentRender;
		console.log('render', this.state.currentRender);
		if (render === 'landing') {
			return <Listings onListingClick={this.handleSelectListing.bind(this)} listings={this.state.listings}/>;
		} else if (render === 'selectedListing') {
			return <SelectedListing listing={this.state.listing}/>
		}
	}

	handleSelectListing(listing) {
		console.log('button clicked!', listing);
		this.setState({
			listing: listing,
			currentRender: 'selectedListing'
		});
	}

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/listings',
      success: (data) => {
        this.setState({
          listings: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('failed', err);
      }

    });
  }

	render () {
		return (
			  <div>
			    <NavB/>
			    {this.currentRender()}
			    <Signup />

			  </div>
		)
	}
}

export default App
