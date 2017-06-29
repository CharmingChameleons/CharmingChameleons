import React from 'react'
import NavB from './NavB.jsx'
import Listings from './Listings.jsx'
import SelectedListing from './SelectedListing.jsx'
import Signup from './Signup.jsx'
import Booking from './Booking.jsx'
import CreateListing from './createListing.jsx'

var $ = require('jquery');


class App extends React.Component {
	constructor (props) {
		super(props);

    this.state = {
    	currentRender: 'landing',
    	listings: [],
    	listing: {},
    	login: false,
      // dummydata
      currentUser: {
        id: 3,
        username: 'Shihao',
      }
    };
    this.loginUser = this.loginUser.bind(this)
	}

	loginUser() {
		console.log('reached loginUser')
		this.setState({
			login: true
		})
    console.log('login', this.state.login);
	}

  currentRender() {
    var render = this.state.currentRender;
    if (render === 'landing') {
      return <Listings 
        onListingClick={this.handleSelectListing.bind(this)} 
        onBookingClick={this.handleBookingClick.bind(this)}
        listings={this.state.listings}
      />;
    } else if (render === 'selectedListing') {
      return <SelectedListing 
        onBackClick={this.handleBackClick.bind(this)} 
        onBookingClick={this.handleBookingClick.bind(this)}
        listing={this.state.listing}
      />;
    } else if (render === 'booking') {
      return <Booking 
        listing={this.state.listing}
        onBackClick={this.handleBackClick.bind(this)} 
        onConfirmClick={this.handleConfirmBooking.bind(this)}
      />
    } else if (render === 'createlisting') {
      return <CreateListing />
    }

  }

  handleSelectListing(listing) {
    console.log('button clicked!', listing);
    this.setState({
      listing: listing,
      currentRender: 'selectedListing'
    });
  }
  handleCreateListing() {
    this.setState({
      currentRender: 'createlisting'
    })
  }

  handleBackClick() {
    this.setState({
      currentRender: 'landing'
    })
  }

  handleLogoClick() {
    console.log('boom boom');
    this.setState({
      currentRender: 'landing'
    })
  }

  handleBookingClick(listing) {
    this.setState({
      listing: listing,
      currentRender: 'booking'
    })
  }

  handleConfirmBooking(listing) {
    let data = [listing.id, this.state.currentUser.id];

    $.ajax({
      type: 'POST',
      url: '/confirm-booking',
      data: { booking: data },
      success: (data) => {
        alert('Your item was booked! Please contact your vendor to arrange a pickup/delivery'); 
        // create button with state
      },
      error: (err) => {
        console.log('failed booking', err);
      }
    })
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
			    <NavB 
            login={this.state.login} 
            loginUser={this.loginUser} 
            onLogoClick={this.handleLogoClick.bind(this)} 
            onCreateClick={this.handleCreateListing.bind(this)}
          />
			    {this.currentRender()}

			  </div>
		)
	}

}

export default App
