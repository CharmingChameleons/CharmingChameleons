import React from 'react'
import ListingsEntry from './ListingsEntry.jsx'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import exampleData from '../dummyData.js'

const Listings = (props) => (
  <div>
    <h3>Listings:</h3>
    <Grid>
        <Row>
        {props.listings.map((listing, index) => 
          <ListingsEntry 
            key={index} 
            listing={listing}
            onListingClick={props.onListingClick}
          />
        )}
        </Row>
      </Grid>
  </div>
)

export default Listings
