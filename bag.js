(function(){

  // Configuration object for the Shopping Bag GET request
  var config = {
    method: window.App.service.getShoppingBag.method,
    url: window.App.service.getShoppingBag.url,

    success: function(data) {
      render(data);
    },

    error: function(error) {
      console.log(error);
    }
  };

  // Method used to render the shopping bag
  // It's called on the first time page load and also after
  // user removes a product from bag
  var render = function(data) {

    // List of bag items placeholder
    var $baglist = $('.list-group');

    // We always clean before re-render the bag list
    $baglist.html('');

    // If we don't have any item on our bag, we display an error message to the user
    if (data.items.length === 0) {

      var emptyBagTemplate = '<div class=\'row\'><div class=\'col-md-8 text-center my-centered\'>' +
        '<div class="error-state" role="alert"> '+
        '<img src=\'img/emptyBag.png\'></div>' +
        '<h4>Oops... Your bag is empty</h4>' +
        '<a href=\'/\' class=\'btn btn-info\'>keep shopping</a>' +
        '</div></div>'

      $('.message').html(emptyBagTemplate);

    } else {

      // Building the html bag item elements
      $.map(data.items, function(item, i) {
        var bagitem = document.createElement('li');
        bagitem.className = 'list-group-item';
        bagitem.id = 'bagitem_' +  item.id;
        bagitem.innerHTML = '<div>' + item.product_name + '</div>';

        var itemprice = document.createElement('span');
        itemprice.className = 'badge partial';
        itemprice.innerHTML = '$' + item.amount;

        var remove = document.createElement('a');
        remove.className = 'remove-button';
        remove.id = item.id;
        remove.innerText ='remove';

        bagitem.appendChild(remove);
        bagitem.appendChild(itemprice);
        $baglist.append(bagitem);
      });

      // Appending the bag total
      var total = '<li class=\'list-group-item active\'>' +
        '<span class=\'badge\'>$' + data.amount +
        '</span><b>Your total: </b></li>'

      $baglist.append(total);

      // If we removed an item, we need to also update our
      // bag icon on the header
      window.App.getBagCounter();

      // Assigning the remove event click for the remove button
      $('.remove-button').click(function() {

        $('#bagitem_' + this.id).fadeOut('slow', function(e) {
          this.remove();
          window.App.getBagCounter();
          updateTotal();
        });

        removeItem(this.id);
      });

    }
  };

  // Method called when an item is removed from the bag
  var removeItem = function(id) {

    var removeConfig = {
      method: window.App.service.removeFromBag.method,
      url: window.App.service.removeFromBag.url + id,

      success: function(data) {
        console.log(data);
      },
      error: function(error) {
        window.base_ajax(config)
      }
    };

    // Triggering the product remove DELETE request
    window.base_ajax(removeConfig);

  };

  // Method used to update the bag total after removing an element
  // TODO: solve issue with DELETE request so this method can be deprecated
  var updateTotal = function() {
    var $bagItems = $('.partial'), total = 0;

    if ($bagItems) {
      $.map($bagItems, function(item, i) {
        var itemValue = item.innerHTML.replace('$', '');

        if (itemValue) {
          total = total + parseFloat(itemValue);  
        }
      });
    }

    $('.list-group-item.active .badge').html('$' + total);

  };

  // Triggering the product fetch request
  window.base_ajax(config);
})();
