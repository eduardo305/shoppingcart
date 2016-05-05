// All ajax calls should pass throught our helper.
var base_ajax = function(config) {
  $.ajax({

    // This is the method we are going to us: GET, POST, DELETE...
    type: config.method,

    // This is the URL we are going to request
    url: config.url,

    // This is the data we are going to send for POST requests
    data: config.data,

    // We are going to set withCredentials true, because we want to have cookies
    // being sent all over the server and client
    xhrFields: {
      withCredentials: true
    },

    // This is the type of data we are expecting to receive
    dataType: 'json',

    // We are going to enable crossdomain, since the API is in a different
    // domain
    crossdomain: true,

    // This is going to be our success handler
    success: config.success,

    // This is going to be our error handler
    error: config.error
  });
};

// We want this base ajax to be visible through the whole application
window.base_ajax = base_ajax;
