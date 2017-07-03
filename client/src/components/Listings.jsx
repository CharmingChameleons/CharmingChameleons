import React from 'react'
import ListingsEntry from './ListingsEntry.jsx'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import exampleData from '../dummyData.js'
import Search from './Search.jsx'

const Listings = (props) => (
  <div>
    <Grid>
    <Search
      handleSearchRender={props.handleSearchRender}
    /> 

    <h3>Listings </h3>
        <Row>
        {props.listings.map((listing, index) =>
          <ListingsEntry
            key={index}
            listing={listing}
            onListingClick={props.onListingClick}
            onBookingClick={props.onBookingClick}
            currentUserId={props.currentUserId}
          />
        )}
        </Row>
      </Grid>
  </div>
)

export default Listings
