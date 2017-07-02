import React from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'

var $ = require('jquery');
import Dropzone from 'react-dropzone'

class CreateListing extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      images: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.postData = this.postData.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }
  handleChange(e) {
    var p = [];
    p.push($('#name').val());
    p.push($('#description').val());
    p.push($('#cost').val());
    p.push($('#tags').val());
    this.postData(p);
  }
  postData(p) {
    let data = new FormData();
    data.append('image', this.state.images[0])
    data.append('params', p)
    var state = this.state;
    console.log('data', data);
    $.ajax({
      url: '/createlisting',
      method: 'POST',
       processData: false,
      contentType: false,
      data: data,
      success: (data) => {
        console.log('success', data)
      },
      error: (err) => {
        console.log('error', err)
      } 
    })
  }

  uploadFile(files) {
    console.log(files);
    this.setState({
      images: files
    })
  }

  render() {
    return (
      <form id='createListng'>
      <ControlLabel>Create a listing</ControlLabel>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            <h3> Enter Name </h3>
          </Col>
          <FormControl
            type="text"
            id='name'
            placeholder="Enter Name"
          />
          <Col componentClass={ControlLabel} sm={2}>
            <h3> Enter Description </h3>
          </Col>
          <FormControl
            type="text"
            id='description'
            placeholder="Enter Description"
          />
          <Col componentClass={ControlLabel} sm={2}>
            <h3> Enter Cost </h3>
          </Col>
          <FormControl
            type="text"
            id='cost'
            placeholder="Enter Cost"
          />
          <Col componentClass={ControlLabel} sm={2}>
             <h3> Add Images </h3>
          </Col>
          <Dropzone 
            onDrop = {this.uploadFile} 
            name='image'
            accept='image/jpeg, image/png'
          />
          <ul>
            {
              this.state.images.map(f => <li>{f.name} - {f.size} bytes</li>)
            }
         </ul>
          <Col componentClass={ControlLabel} sm={2}>
            <h3> Enter Tags </h3>
          </Col>
          <FormControl
            type="text"
            id='tags'
            placeholder="Enter Tags"
          />
          <Button onClick={this.handleChange}>Create</Button>
        </FormGroup>
      </form>
    );
  }
}


export default CreateListing

