(function() {

  // Configuring the GET request for fetching all products on the bag
  var header = {

    config: {
      method: window.App.service.getShoppingBag.method,
      url: window.App.service.getShoppingBag.url,
      success: function(data) {
        $('#bag-icon span').html('');
        $('#bag-icon').append('<span>' + data.items.length + '</span>');
      },

      error: function(error) {
        console.log(error);
      }
    },

    trigger: function() {
      window.base_ajax(header.config);
    }
  };

  // We want to update the bag icon counter in several contexts
  // Then we are making this configuration available everywhere
  window.App.header = header;
  
})();
