import React from 'react'
import ListingsEntry from './ListingsEntry.jsx'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import exampleData from '../dummyData.js'

class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.listings = exampleData;
    console.log(exampleData);
  }

  render() {
    return (
      <div>
        <h3>Listings:</h3>
        <Grid>
            <Row>
            { this.listings.map((listing) => 
              <ListingsEntry key={listing.name} listing={listing}/>
            )}
            </Row>
          </Grid>
      </div>
    );
  }
}

export default Listings
