import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ListingsEntry from './ListingsEntry.jsx'
const $ = require('jquery');




class Profile extends React.Component {
	constructor (props) {
		super(props);
    this.state = {
    	listings: []
    };
	}

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/userlisting',
      success: (data) => {
        console.log(data);
        this.setState({
          listings: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('failed', err);
      }

    });
  }

  render () {
   return (
       <div>
         <Button onClick={ function() {this.props.onBackClick()}.bind(this) } bsStyle="primary">Back</Button>
         <h1>LOL</h1>
           {this.state.listings.map((listing,index) =>
             <ListingsEntry
               key={index}
               listing={listing}
             />
           )}
       </div>
   )
 }
}

export default Profile
