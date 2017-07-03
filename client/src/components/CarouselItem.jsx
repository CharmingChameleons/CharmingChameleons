import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'
import Carousel from 'react-bootstrap/lib/Carousel'

const CarouselItem = (props) => (
	<div>
		<Carousel.Item>
	        <img className='listing' width={900} height={500} alt="900x500" src={'./images/listings/' + props.listing.id + '/' + props.counter + '.jpg'}/>
	    </Carousel.Item>
	</div>
)


export default CarouselItem