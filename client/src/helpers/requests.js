import $ from 'jquery'

const deleteListing = (listingId)=>{
  $.ajax({
    url: '/deletelisting',
    method: 'DELETE',
    data: {
      params: listingId,

    },
    success: (data) => {
      console.log('success', data)
    },
    error: (err) => {
      console.log('error', err)
    }
  })
}


export {deleteListing};
