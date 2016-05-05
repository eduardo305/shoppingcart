(function(){

  // Setting up our global App object
  window.App = window.App ? window.App : {};

  // Global method used to update the bagCounter
  window.App.getBagCounter = function() {
    var $bagItems = $('.list-group-item');
    var $bagCounter = $('#bag-icon span');

    if ($bagItems) {
      if ($bagCounter.length > 0) {
        $bagCounter.html('<span>' + ($bagItems.length - 1) + '</span>');
      } else {
        $('#bag-icon').append('<span>' + ($bagItems.length - 1) + '</span>');  
      } 
      
    }
  };

  // All Service requests separated in Global object so it can be accessed
  // throughout the whole application
  window.App.service = {
    getProducts: {
      method: 'GET',
      url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/products'
    },

    getShoppingBag: {
      method: 'GET',
      url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart'
    },

    addToBag: {
      method: 'POST',
      url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart/items'
    },

    removeFromBag: {
      method: 'DELETE',
      url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart/items/'
    }
  };

  // API is returnig only the relative path of the images
  // In this case, I won't be able to show the original images
  // This mapping will deal with this issue and we are goingt
  // to display hardcoded images
  window.App.assets = {
    '10ce6eec-fb54-49cc-99d6-4c0a509410c7': {
      url: 'http://www.campusstore.utah.edu/utah/StoreImages/5-1407648-2.jpg'
    },

    '21dc2fb7-86f3-4d00-918c-bd8884de9beb': {
      url: 'img/generic.png'
    },


    '6c682929-ee49-4f86-a8ca-f63cf90b03de': {
      url: 'img/edge.jpeg'
    },

    '9fc9bd2d-8642-4976-9787-9e699faa0157': {
      url: 'img/cube.jpeg'
    },

    'b212859c-4ea5-4760-b555-a0b660c93c75': {
      url: 'img/macbook.jpeg'
    },

    'bf1efa4c-9b0f-40d2-b6ff-99082cb346ff': {
      url: 'img/acrobots.jpeg'
    }
  }

})();
