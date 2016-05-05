(function() {

  // Creating the config object to fetch the products from the server
  var config = {
    method: window.App.service.getProducts.method,
    url: window.App.service.getProducts.url,

    success: function(data) {
      render(data);
    },

    error: function(error) {
      console.log(error);
    }
  };

  // Used to render the product pool on the page. It's called whenever
  // the GET product requests returns true
  var render = function(data) {
    var col, thumbnail, img, description, price, button;

    $.map(data, function(product, i) {
      
      // Create the wrapper column
      col = document.createElement('div');
      col.className = 'col-md-4';

      // Create the thumbnail wrapper
      thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';

      // Create the image element
      img = document.createElement('img');
      img.src = window.App.assets[product.id].url;

      // Create the description element
      description = document.createElement('div');
      description.className = 'description';
      description.innerHTML = '<h4>' + product.name + '<h4>';

      // Create the price element
      price = document.createElement('p');
      price.className = 'price';
      price.innerText = '$' + product.price;

      // Create the button element
      button = document.createElement('div');
      button.className = 'atb';
      button.innerHTML = '<button id=\'' + product.id + '\'type=\'button\' name=\'button\' class=\'atb btn btn-danger\'>add to bag</button>';

      // Set the objects hierarchy inside the column wrapper
      description.appendChild(price);
      description.appendChild(button);
      thumbnail.appendChild(img);
      thumbnail.appendChild(description);
      col.appendChild(thumbnail);

      // Append the column wrapper to the product pool placeholder
      $('.product-pool .row').append(col);

    });

    window.App.header.trigger();

    // Assigning the event click to the add to bag button
    $('.atb').click(function(e) {
      e.stopPropagation();
      addItem(this.id);
    });

  };

  // Method used to add on item to the bag
  // Because of the API CORS response issue, we are handling the success response
  // on the error function handler
  var addItem = function(id) {

    var addConfig = {
      method: window.App.service.addToBag.method,
      url: window.App.service.addToBag.url,
      data: { product_id: id, quantity: 1 },

      success: function(data) {
        console.log(data);
      },

      error: function(error) {
        // Rendering the updated bag icon
        window.base_ajax(window.App.header.config);

        $('#myModal').modal('show');
      }
    };

    // Triggering the add to bag POST request
    // so the product can be added to the bag
    window.base_ajax(addConfig);
  };

  // Triggering the GET product request so the thumbnails
  // can be populated on the product pool
  window.base_ajax(config);

})();