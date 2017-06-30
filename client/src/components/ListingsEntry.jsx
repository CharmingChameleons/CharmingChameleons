import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import Button from 'react-bootstrap/lib/Button'
import {deleteListing} from '../helpers/requests.js';


const ListingsEntry = (props) => (
    <div>
    <Col xs={6} md={2}>
    <h4>{props.listing.name}</h4>
      <Thumbnail src={'./images/listings/' + props.listing.id + '/1.jpg'} alt="242x200">
        <h4>{props.listing.description}</h4>
        <p>tags: {props.listing.tags}</p>
        <p>
          <Button onClick={ function() { props.onBookingClick(props.listing) } } bsStyle="primary">Book</Button>&nbsp;
          <Button onClick={ function() { props.onListingClick(props.listing) } } bsStyle="default">Show listing</Button>
          <Button onClick={ function() { deleteListing(props.listing.id) } } bsStyle="default">deleteListing</Button>

        </p>
      </Thumbnail>
    </Col>
    </div>
  );

export default ListingsEntry
