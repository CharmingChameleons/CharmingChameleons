import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import Button from 'react-bootstrap/lib/Button'

const ListingsEntry = (props) => (
    <div>
    <h4>{props.listing.name}</h4>
    <Col xs={6} md={4}>
      <Thumbnail src={'./images/listings/' + props.listing.lenderId + '/1.jpg'} alt="242x200">
        <h3>{props.listing.description}</h3>
        <p>tags: {props.listing.tags}</p>
        <p>
          <Button bsStyle="primary">Book</Button>&nbsp;
          <Button bsStyle="default">What does this button do?</Button>
        </p>
      </Thumbnail>
    </Col>
    </div>
  );

export default ListingsEntry
