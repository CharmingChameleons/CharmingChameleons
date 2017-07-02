import $ from 'jquery';


const getUserListings = (userId, cb) =>{
  $.ajax({
    type: 'GET',
    url: '/userlisting',
    data: {
      params: userId
    },
    success: (data) => {
      console.log(data);
      cb(data)
    },
    error: (err) => {
      console.log('failed', err);
    }

  });
};

const getBorrowerListings = (userId, cb) =>{
  $.ajax({
    type: 'GET',
    url: '/borrowerlistings',
    data: {
      params: userId
    },
    success: (data) => {
      console.log(data);
      cb(data)
    },
    error: (err) => {
      console.log('failed', err);
    }

  });
};

const deleteListing = (listingId, cb)=>{
  console.log('deleting:', listingId );
  $.ajax({
    url: '/deletelisting',
    method: 'DELETE',
    data: {
      params: listingId,

    },
    success: (data) => {
      console.log('success', data);
      alert('Listing deleted');
      cb();
    },
    error: (err) => {
      console.log('error', err)
    }
  })
};

const returnItem = (listingId)=>{
  console.log('returning:', listingId );
  $.ajax({
    url: '/deletebooking',
    method: 'DELETE',
    data: {
      params: listingId,

    },
    success: (data) => {
      console.log('success', data)
      alert('booking deleted')
    },
    error: (err) => {
      console.log('error', err)
    }
  })
};


export {getUserListings, getBorrowerListings, returnItem, deleteListing};
