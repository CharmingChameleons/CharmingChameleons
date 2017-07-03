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

class CreateListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0
    }

    this.showPosition = this.showPosition.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
  }

  showPosition(position) {
    console.log('lat', position.coords.latitude, 'long', position.coords.longitude)
    this.setState = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  render() {  
    return (
      <Grid>
      <h3>Create Your Listing:</h3>
        <form 
          ref='createListing'
          id='createListing'
          action='/createlisting'
          method='post'
          encType='multipart/form-data'
        >
          Name: <br/>
          <input type='text' name='name'/> <br/>
          Description: <br/>
          <input type='text' name='description'/> <br/>
          Cost: <br/>
          <input type='text' name='cost'/> <br/>
          Tags: <br/>
          <input type='text' name='tags'/> <br/><br/>
          <input type='file' name='listingImage' /> <br/>
          <input type='submit' value='Submit!' /> <br/>
          <input type='hidden' name='id' value={this.props.currentUserId} />
        </form>
      </Grid>
    )
  }
};

export default CreateListing;
