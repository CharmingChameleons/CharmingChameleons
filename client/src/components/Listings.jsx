import React from 'react'
import ListingsEntry from './ListingsEntry.jsx'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'




const Listings = () => (
<div>
  <h3>Listings:</h3>
  <Grid>
      <Row>
        <ListingsEntry/>
      </Row>
    </Grid>
</div>
)

export default Listings
