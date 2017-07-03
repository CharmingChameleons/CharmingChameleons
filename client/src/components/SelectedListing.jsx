import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'
import ReviewsView from './ReviewsView.jsx'


const SelectedListing = (props) => (
  <div>
    <Grid>
    <Button onClick={ function() {props.onBackClick()} } bsStyle="primary">Back</Button>
    <br/>
    <br/>
    <Panel bsStyle="primary">
      <h2 className='listing-title'>{props.listing.name}</h2>
    </Panel>
    <br/>
    <br/>
        <img className='listing' src={'./images/listings/' + props.listing.id + '/1.jpg'} alt="242x200"/> <br/>
        <br/>
        <Panel header={props.listing.name} bsStyle="primary">
          <Panel header='Details' bsStyle="info">
            {props.listing.description}
          </Panel>
          <Panel>
            ${props.listing.cost}
          </Panel>
          <Panel header='Tags' bsStyle="info">
            {props.listing.tags}
          </Panel>
        </Panel>
        <p>
          <Button onClick={ function() {props.onBookingClick(props.listing)} } bsStyle="primary">Book</Button>&nbsp;
        </p>
    </Grid>
    <ReviewsView listingId={props.listing.id}/>
  </div>
)


export default SelectedListing
