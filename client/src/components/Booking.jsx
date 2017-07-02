import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'

const Booking = (props) => (
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
          <Panel header='Details'>
            {props.listing.description}
          </Panel>
          <Panel>
            ${props.listing.cost}
          </Panel>
          <Panel header='Tags'>
            {props.listing.tags}
          </Panel>
        </Panel>

        <Panel header="Hit 'Confirm Booking' to Continue Your Transaction" bsStyle="primary">
          <Button className="button-book" bsStyle="primary" onClick={ function() {props.onConfirmClick(props.listing)} }>Confirm Booking</Button>
        </Panel>
    </Grid>
  </div>
)


export default Booking;