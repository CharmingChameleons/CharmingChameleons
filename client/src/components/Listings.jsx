import React from 'react'
import ListingsEntry from './ListingsEntry.jsx'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import exampleData from '../dummyData.js'
var $ = require('jquery');

class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  componentDidMount() {
    console.log('running ajax request');
    $.ajax({
      type: 'GET',
      url: '/listings',
      success: (data) => {
        this.setState({
          listings: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('failed', err);
      }

    });
  }

  render() {
    return (
      <div>
        <h3>Listings:</h3>
        <Grid>
            <Row>
            { this.state.listings.map((listing) => 
              <ListingsEntry key={listing.name} listing={listing}/>
            )}
            </Row>
          </Grid>
      </div>
    );
  }
}

export default Listings
