import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import Button from 'react-bootstrap/lib/Button'
import {deleteListing, returnItem} from '../helpers/requests.js';


const ListingsEntry = (props) => (
    <div>
    <Col xs={6} md={2}>
    <h4>{props.listing.name}</h4>
      <Thumbnail src={'./images/listings/' + props.listing.id + '/1.jpg'} alt="242x200">
        <h4>{props.listing.description}</h4>
        <p>lender: {props.listing.username}</p>
        <p>borrowerId: {props.listing.borrowerid}</p>
        <p>tags: {props.listing.tags}</p>
        <p>

          <Button onClick={ function() { props.onBookingClick(props.listing) } } bsStyle="primary">Book</Button>&nbsp;
          <Button onClick={ function() { props.onListingClick(props.listing) } } bsStyle="default">Show listing</Button>
          {props.currentUserId === props.listing.lenderid  && props.listing.borrowerid === null &&
            <Button onClick={ function() { deleteListing(props.listing.id, props.reRender) } } bsStyle="default">Delete item</Button>
          }
          {props.currentUserId === props.listing.borrowerid &&
            <Button onClick={ function() { returnItem(props.listing.id) } } bsStyle="default">Return</Button>
          }
        </p>
      </Thumbnail>
    </Col>
    </div>
  );

export default ListingsEntry
