import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'

const Booking = (props) => (
  <div>
    <Grid>
      <h2>Book Your Current Item: {props.listing.name}</h2>  
      <Button onClick={ function() {props.onBackClick()} } bsStyle="primary">Back</Button> 
      <br/>
      <br/>  
      <Row>
        <img className='listing' src={'./images/listings/' + props.listing.id + '/1.jpg'} alt="242x200"/> <br/>
        <br/> 
        Description: {props.listing.description} <br/>
        Price: ${props.listing.cost} <br/>
        Tags: {props.listing.tags} <br/>
        <br/>

        Hit 'Confirm Booking' to Continue Your Transaction
        <p>
          <Button onClick={ function() {props.onConfirmClick(props.listing)} } bsStyle="primary">Confirm Booking</Button>&nbsp;
        </p>
      </Row>
    </Grid>
  </div>
)


export default Booking;