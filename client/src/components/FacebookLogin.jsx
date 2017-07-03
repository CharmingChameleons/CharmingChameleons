import React from 'react'
//import Facebook from 'react-facebook-login';
 
class FacebookLogin extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount () {
	  	window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '233448807173055',
		      cookie     : true,
		      xfbml      : true,
		      version    : 'v2.8'
		    });
		    FB.AppEvents.logPageView();   

		    // Now that we've initialized the JavaScript SDK, we call
		    // FB.getLoginStatus().  This function gets the state of the
		    // person visiting this page and can return one of three states to
		    // the callback you provide.  They can be:
		    //
		    // 1. Logged into your app ('connected')
		    // 2. Logged into Facebook, but not your app ('not_authorized')
		    // 3. Not logged into Facebook and can't tell if they are logged into
		    //    your app or not.
		    //
		    // These three cases are handled in the callback function.
		    FB.getLoginStatus(function(response) {
		      this.statusChangeCallback(response);
		    }.bind(this));
		}.bind(this);

		(function(d, s, id){
    		var js, fjs = d.getElementsByTagName(s)[0];
    		if (d.getElementById(id)) {return;}
     			js = d.createElement(s); js.id = id;
     			js.src = "//connect.facebook.net/en_US/sdk.js";
     			fjs.parentNode.insertBefore(js, fjs);
   		}(document, 'script', 'facebook-jssdk'));

	 //  	// Load the SDK asynchronously
		// (function(d, s, id) {
		//   var js, fjs = d.getElementsByTagName(s)[0];
		//   if (d.getElementById(id)) return;
		//   js = d.createElement(s); js.id = id;
		//   js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=233448807173055";
		//   fjs.parentNode.insertBefore(js, fjs);
		// }(document, 'script', 'facebook-jssdk'));
	}

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	testAPI () {
	  console.log('Welcome!  Fetching your information.... ');
	  FB.api('/me', function(response) {
	  console.log('Successful login for: ' + response.name);
	  document.getElementById('status').innerHTML =
	    'Thanks for logging in, ' + response.name + '!';
	  });
	}

	// This is called with the results from from FB.getLoginStatus().
	statusChangeCallback (response) {
	  console.log('statusChangeCallback');
	  console.log(response);
	  // The response object is returned with a status field that lets the
	  // app know the current login status of the person.
	  // Full docs on the response object can be found in the documentation
	  // for FB.getLoginStatus().
	  if (response.status === 'connected') {
	    // Logged into your app and Facebook.
	    this.testAPI();
	  } else if (response.status === 'not_authorized') {
	    // The person is logged into Facebook, but not your app.
	    document.getElementById('status').innerHTML = 'Please log ' +
	      'into this app.';
	  } else {
	    // The person is not logged into Facebook, so we're not sure if
	    // they are logged into this app or not.
	    document.getElementById('status').innerHTML = 'Please log ' +
	    'into Facebook.';
	  }
	}

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	checkLoginState () {
	  FB.getLoginStatus(function(response) {
	    this.statusChangeCallback(response);
	  }.bind(this));
	}

	handleClick () {
	  FB.login(this.checkLoginState());
	}

	responseFacebook(response) {
  		console.log(response);
	}
 
    render() {
      	return (
      		<div id="fb-root">
	        	<div className="fb-login-button" 
	        		data-max-rows="1" 
	        		data-size="medium" 
	        		data-button-type="login_with" 
	        		data-show-faces="false" 
	        		data-auto-logout-link="true" 
	        		data-use-continue-as="true"
	        		onClick={this.handleClick.bind(this)}>
	        	</div>
	        </div>
      	)
    }
}
  
export default FacebookLogin;


// <script>(function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=233448807173055";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));</script>




