import React from 'react'
import ListingsEntry from './ListingsEntry.jsx'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import exampleData from '../dummyData.js'

const Listings = (props) => (
  <div>
    <Grid>
    <h3>Listings:</h3>
        <Row>
        {props.listings.map((listing) => 
          <ListingsEntry 
            key={listing.name} 
            listing={listing}
            onListingClick={props.onListingClick}
          />
        )}
        </Row>
      </Grid>
  </div>
)

export default Listings
