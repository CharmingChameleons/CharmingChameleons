import React from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
var $ = require('jquery');
//import Dropzone from 'react-dropzone'


const CreateReview = (props) => (
  <Grid>
  <h3>Create Your Listing:</h3>
    <form
      ref='createReview'
      id='createReview'
      action='/listingReview'
      method='post'
      encType='multipart/form-data'
    >

      Review: <br/>
    <input type='text' name='review'/> <br/>
      Stars out of 5: <br/>
      <input type='int' name='stars'/> <br/>
      <input type='hidden' name='userId' value={props.currentUserId} />
      <input type='hidden' name='listingId' value={props.listingId} />
      <input type='submit' value='Submit!' /> <br/>
    </form>
  </Grid>
);

export default CreateReview;
