import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'

const SelectedListing = (props) => (
  <div>
    <h2>{props.listing.name}</h2>
    <Grid>
      <Row>
        Description: {props.listing.description} <br/>
        Price: {props.listing.cost} <br/>
        Tags: {props.listing.tags} <br/>
      </Row>
    </Grid>
  </div>
)


export default SelectedListing