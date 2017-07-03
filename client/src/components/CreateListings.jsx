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

class CreateListing extends React.Component{
  constructor (props) {
    super (props)

    this.state = {
      name: '',
      images: []
    }

    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleName = this.handleName.bind(this)
  }

  handleName (event) {
    this.setState({
      name: event.target.value
    })
  }

  handleFileUpload (event) {
 
    //console.log('reached', Array.from(event.target.files))
    //var temp = 
    this.state.images = this.state.images.concat(Array.from(event.target.files))

    console.log(this.state.images.length)
  }

  render () {
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
          <input type='file' name='listingImage' required multiple /> <br/>
          <input type='submit' value='Submit!' /> <br/>
          <input type='hidden' name='id' value={this.props.currentUserId} />
        </form>
      </Grid>
    )
  }
}

export default CreateListing;
