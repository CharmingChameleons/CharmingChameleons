import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import Button from 'react-bootstrap/lib/Button'




const ListingsEntry = () => (
    <div>
    <h4>Listings entry</h4>
    <Col xs={6} md={4}>
      <Thumbnail src="https://c1.staticflickr.com/3/2571/3751361850_c19cfd5c8d_b.jpg" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    </div>
  );

export default ListingsEntry
