import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'
import $ from 'jquery'
import Carousel from 'react-bootstrap/lib/Carousel'

import CarouselItem from './CarouselItem.jsx'
import ReviewsView from './ReviewsView.jsx'

class SelectedListing extends React.Component{
  constructor (props) {
    super (props)

    this.state = {
      images: []
    }

    this.renderCarouselItem = this.renderCarouselItem.bind(this)
    this.setImages = this.setImages.bind(this)
  }

  componentWillMount() {
    this.renderCarouselItem()
  }

  setImages(result) {
    this.setState({
      images: result
    })
  }

  renderCarouselItem() {
    var counter = 1;

    var dirname = './images/listings/' + this.props.listing.id

    var result = []

    var setImages = this.setImages

    $.ajax({
      url: '/getNumberOfFiles',
      method: 'GET',
      data: {
        params: dirname
      },
      success: (n) => {
        console.log('success', n)
        counter = parseInt(n)
        for (var i = 0; i < counter; i ++) {
          result.push(<CarouselItem listing={this.props.listing} counter={i+1} />)
        }
        
        console.log(result)
        
        setImages(result)
      },
      error: (err) => {
        console.log('error', err)
      } 
    })
  }

  render () {
    return (
      <div>
        <Grid>
        <Button onClick={ function() {this.props.onBackClick()} } bsStyle="primary">Back</Button> 
        <br/>
        <br/>
        <Panel bsStyle="primary">
          <h2 className='listing-title'>{this.props.listing.name}</h2>
        </Panel>
        <br/>
        <br/>
            <Carousel>
              {this.state.images.map((item, index) => {
                return <Carousel.Item key={index}>
                        <img className='listing' width={900} height={500} alt="900x500" src={'./images/listings/' + this.props.listing.id + '/' + (index + 1) + '.jpg'}/>
                      </Carousel.Item>
              })}
            </Carousel>
            <br/> 
            <Panel header={this.props.listing.name} bsStyle="primary">
              <Panel header='Details' bsStyle="info">
                {this.props.listing.description}
              </Panel>
              <Panel>
                ${this.props.listing.cost}
              </Panel>
              <Panel header='Tags' bsStyle="info">
                {this.props.listing.tags}
              </Panel>
            </Panel>
            <p>
              <Button onClick={ function() {this.props.onBookingClick(this.props.listing)} } bsStyle="primary">Book</Button>&nbsp;
            </p>
        </Grid>
        <ReviewsView listingId={this.props.listing.id}/>
      </div>
    )
  }
} 

export default SelectedListing
