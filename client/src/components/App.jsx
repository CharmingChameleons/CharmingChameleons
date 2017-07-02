import React from 'react'
import NavB from './NavB.jsx'
import Listings from './Listings.jsx'
import SelectedListing from './SelectedListing.jsx'
import Signup from './Signup.jsx'
import Booking from './Booking.jsx'
import CreateListing from './CreateListings.jsx'
import Profile from './Profile.jsx'
const $ = require('jquery');
import Search from './Search.jsx'


class App extends React.Component {
	constructor (props) {
		super(props);

    this.state = {
    	currentRender: 'landing',
    	listings: [],
    	listing: {},
    	login: localStorage.getItem('loggedin') || false,
      currentUser: {
        id: parseInt(localStorage.getItem('id')) || null,
        username: localStorage.getItem('username') || null,
      },
      promptLoginModal: false
    };

    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.resetLoginModal = this.resetLoginModal.bind(this)
    this.setPromptLoginModal = this.setPromptLoginModal.bind(this)
	}

	loginUser(user) {
    console.log('reached loginUser')
    this.setState({
      login: true,
      currentUser: {
        id: parseInt(user.id),
        username: user.username,
      }
    })

    localStorage.setItem('id', user.id)
    localStorage.setItem('username', user.username)
    localStorage.setItem('loggedin', true)
    console.log('login, currentUser', this.state.login, this.state.currentUser);
  }

  logoutUser() {
    console.log('reached logout')
    this.setState({
      login: false,
      currentUser: {
        id: 0,
        username: ''
      }
    })

    localStorage.clear();
  }

  logoutUser() {
    console.log('reached logout')
    this.setState({
      login: false,
      currentUser: {
        id: 0,
        username: ''
      }
    })

    localStorage.clear();
  }

  resetLoginModal() {
    this.setState({
      promptLoginModal: false
    })
  }

  setPromptLoginModal() {
    this.setState({
      promptLoginModal: true
    })
  }

  currentRender() {
    var render = this.state.currentRender;
    if (render === 'landing') {
      return( 
      <div>
        <Search handleSearchRender={this.handleSearchRender.bind(this)}/>
        <Listings 
          onListingClick={this.handleSelectListing.bind(this)} 
          onBookingClick={this.handleBookingClick.bind(this)}
          listings={this.state.listings}
        />;
      </div>)
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
      return <CreateListing
        currentUserId={this.state.currentUser.id}
        />;
    } else if(render === 'profile'){
      return <Profile
        onBackClick={this.handleBackClick.bind(this)}
        currentUserId={this.state.currentUser.id}
      />;
    }

  }

  handleSelectListing(listing) {
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

  handleSelectProfile() {
    console.log('GO to Profile')
    this.setState({
      currentRender: 'profile'
    })
  }


  handleBackClick() {
    this.setState({
      currentRender: 'landing'
    })
  }

  handleLogoClick() {
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

    if (this.state.login) {
      $.ajax({
        type: 'POST',
        url: '/confirm-booking',
        data: { booking: data },
        success: (data) => {
          alert('Your item was booked! Please contact your vendor to arrange a pickup/delivery');
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
        },
        error: (err) => {
          console.log('failed booking', err);
        }
      })
    } else {
        this.setPromptLoginModal()
    }

  }

  handleSearchRender(data){
    this.setState({
      listings: data
    }, ()=> {
      console.log('state change',this.state.listing);
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
            logoutUser={this.logoutUser}
            promptLoginModal={this.state.promptLoginModal}
            resetLoginModal={this.resetLoginModal}
            onLogoClick={this.handleLogoClick.bind(this)}
            onCreateClick={this.handleCreateListing.bind(this)}
            handleSelectProfile={this.handleSelectProfile.bind(this)}
            currentUsername={this.state.currentUser.username}

          />
			    {this.currentRender()}

			  </div>
		)
	}

}

export default App
