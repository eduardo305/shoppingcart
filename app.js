(function(){

  window.App = window.App | {};

  var config = {
    method: 'GET',
    url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart',
    success: function(data) {
      console.log(data);
    },
    error: function(error) {
      console.log(error);
    }
  };

  //window.base_ajax(config);

  var config = {
    method: 'POST',
    url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart/items',
    data: { product_id: "10ce6eec-fb54-49cc-99d6-4c0a509410c7", quantity: 1 },
    success: function(data) {
      console.log(data);
    },
    error: function(error) {
      console.log(error);
    }
  };

  //window.base_ajax(config);

  /*$.ajax({
    method: "POST",
    url: "http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart/items",
    data: { product_id: "10ce6eec-fb54-49cc-99d6-4c0a509410c7", quantity: 1 },
    crossdomain: true,
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    }
  })
  .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });


  $.ajax({
    method: 'GET',
    url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart',
    crossdomain: true,
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    alert(data);
  });*/
})();
