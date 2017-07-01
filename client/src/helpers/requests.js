import $ from 'jquery'

const deleteListing = (listingId)=>{
  console.log('deleting:', listingId );
  $.ajax({
    url: '/deletelisting',
    method: 'DELETE',
    data: {
      params: listingId,

    },
    success: (data) => {
      console.log('success', data)
      alert('Listing deleted')
    },
    error: (err) => {
      console.log('error', err)
    }
  })
}


export {deleteListing};
