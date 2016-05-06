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

    var bagItem, itemprice, remove, total, emptyBagTemplate;

    // We always clean before re-render the bag list
    $baglist.html('');

    // If we don't have any item on our bag, we display an error message to the user
    if (data.items.length === 0) {

      emptyBagTemplate = '<div class=\'row\'><div class=\'col-md-8 text-center my-centered\'>' +
        '<div class="error-state" role="alert"> '+
        '<img src=\'/img/emptyBag.png\'></div>' +
        '<h4>Oops... Your bag is empty</h4>' +
        '<a href=\'/\' class=\'btn btn-info\'>keep shopping</a>' +
        '</div></div>'

      $('.message').html(emptyBagTemplate);

    } else {

      // Building the html bag item elements
      $.map(data.items, function(item, i) {
        bagitem = document.createElement('li');
        bagitem.className = 'list-group-item';
        bagitem.id = 'bagitem_' +  item.id;
        bagitem.innerHTML = '<div>' + item.product_name + '</div>';

        itemprice = document.createElement('span');
        itemprice.className = 'badge partial';
        itemprice.innerHTML = '$' + item.amount;

        remove = document.createElement('a');
        remove.className = 'remove-button';
        remove.id = item.id;
        remove.innerText ='remove';

        bagitem.appendChild(remove);
        bagitem.appendChild(itemprice);
        $baglist.append(bagitem);
      });

      // Appending the bag total
      total = '<li class=\'list-group-item active\'>' +
        '<span class=\'badge\'>$' + data.amount +
        '</span><b>Your total: </b></li>'

      $baglist.append(total);

      // Assigning the remove event click for the remove button
      $('.remove-button').click(function() {

        $('#bagitem_' + this.id).fadeOut('slow', function(e) {
          this.remove();

          // This is a workaround for the DELETE method issue. It needs to be
          // uncommented so it can be verified.
          // More detais: https://github.com/eduardo305/shoppingcart/blob/master/README.md
          //window.App.getBagCounter();
          //updateTotal();
        });

        removeItem(this.id);
      });

    }

    // If we removed an item, we need to also update our
    // bag icon on the header
    window.App.updateBagCounter(data.items);
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
  // For more details, refer to:
  // https://github.com/eduardo305/shoppingcart/blob/master/README.md
  /*var updateTotal = function() {
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

  };*/

  // Triggering the product fetch request
  window.base_ajax(config);
})();
