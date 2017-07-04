import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'
import ReviewsView from './ReviewsView.jsx'
import GettingStartedGoogleMap from './Maps.jsx'

class SelectedListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [{
        position: {
          lat: parseFloat(props.listing.latitude),
          lng: parseFloat(props.listing.longitude),
        },
        key: `United States`,
        defaultAnimation: 2,
      }],
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    return (
      <div>
        <Grid>
        <Button onClick={ function() {this.props.onBackClick()}.bind(this) } bsStyle="primary">Back</Button> 
        <br/>
        <br/>
        <Panel bsStyle="primary">
          <h2 className='listing-title'>{this.props.listing.name}</h2>
        </Panel>
        <br/>
        <br/>
            <img className='listing' src={'./images/listings/' + this.props.listing.id + '/1.jpg'} alt="242x200"/> <br/>
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
            <ReviewsView listingId={this.props.listing.id}/>
            <GettingStartedGoogleMap
              containerElement={
                <div style={{ height: `50%` }} />
              }
              mapElement={
                <div style={{ 
                  height: `100%`,
                  width: `50%`,
                  margin: `auto`
                }} />
              }
              onMapLoad={this.handleMapLoad}
              markers={this.state.markers}
            />
            <p>
              <Button onClick={ function() {this.props.onBookingClick(this.props.listing)}.bind(this) } bsStyle="primary">Book</Button>&nbsp;
            </p>
        </Grid>
      </div>
    )
  }
}

export default SelectedListing