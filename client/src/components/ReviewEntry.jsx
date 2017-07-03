import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Thumbnail from 'react-bootstrap/lib/Thumbnail'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'



const ReviewEntry = (props) => (
    <div>
      <Panel bsStyle="info" header={props.review.username}>
        <p>Stars: {props.review.stars}</p>
        <p>Revew: {props.review.review}</p>
      </Panel>
    </div>
  );

export default ReviewEntry
