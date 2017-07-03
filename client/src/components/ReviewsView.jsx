import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import Button from 'react-bootstrap/lib/Button'
import Grid from 'react-bootstrap/lib/Grid'
import ReviewEntry from './ReviewEntry.jsx'
import {getListingReviews} from '../helpers/requests.js'



class ReviewsView extends React.Component {
	constructor (props) {
		super(props);
    this.state = {
      listingId : props.listingId,
    	reviews: [],
      currentUserId: props.currentUserId
    };
	}

  componentDidMount() {
    getListingReviews(this.state.listingId,(data) => {
      this.setState({
        reviews: JSON.parse(data)
      });
    });
  }

 render () {
   return (
    <Grid>

    <h3>Reviews </h3>
        <Row>

        {this.state.reviews.map((review, index) =>
          <ReviewEntry
            key={index}
            review={review}
            currentUserId={this.props.currentUserId}
          />
        )}

        </Row>
      </Grid>
  )}
}


export default ReviewsView;
