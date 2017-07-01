import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ListingsEntry from './ListingsEntry.jsx'
const $ = require('jquery');




class Profile extends React.Component {
	constructor (props) {
		super(props);
    this.state = {
    	listings: [],
      currentUserId: props.currentUserId
    };
	}

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/userlisting',
      data: {
        params: this.state.currentUserId

      },
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
           {this.state.listings.map((listing,index) =>
             <ListingsEntry
               key={index}
               listing={listing}
               currentUserId={this.props.currentUserId}
             />
           )}
       </div>
   )
 }
}

export default Profile
