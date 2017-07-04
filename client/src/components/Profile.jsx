import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import ListingsEntry from './ListingsEntry.jsx'
import {getUserListings} from '../helpers/requests.js'
import {getBorrowerListings} from '../helpers/requests.js'

class Profile extends React.Component {
	constructor (props) {
		super(props);
    this.state = {
    	listings: [],
      borrowerListings: [],
      currentUserId: props.currentUserId
    };
	}

  componentDidMount() {
    getUserListings(this.state.currentUserId,(data) => {
      this.setState({
        listings: JSON.parse(data)
      });
    });
    getBorrowerListings(this.state.currentUserId,(data) => {
      this.setState({
        borrowerListings: JSON.parse(data)
      });
    });
  }

  render () {
   return (
      <div>
        <Grid>
        <Button onClick={ function() {this.props.onBackClick()}.bind(this) } bsStyle="primary">Back</Button>
        <Row>
          <h3>Currently listed by you:</h3>
            {this.state.listings.map((listing,index) =>
            <ListingsEntry
              key={index}
              listing={listing}
              currentUserId={this.props.currentUserId}
              reRender={this.componentDidMount.bind(this)}
            />
          )}
        </Row>
        <Row>
           <h3>Currently booked by you:</h3>
           {this.state.borrowerListings.map((listing,index) =>
            <ListingsEntry
              key={index}
              listing={listing}
              currentUserId={this.props.currentUserId}
              reRender={this.componentDidMount.bind(this)}
              handleCreateReview={this.props.handleCreateReview}
            />
          )}
        </Row>
        </Grid>
      </div>
 )}
}

export default Profile;
