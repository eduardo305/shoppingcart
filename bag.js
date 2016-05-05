(function(){

  var config = {
    method: 'GET',
    url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart',
    success: function(data) {
      var $baglist = $('.list-group');

      $baglist.html('');

      if (data.items.length === 0) {
        $('.message').html('<div class="alert alert-info" role="alert">Your bag is empty...</div>');
      } else {

      }

      $.map(data.items, function(item, i) {
        var bagitem = document.createElement('li');
        bagitem.className = 'list-group-item';
        bagitem.innerHTML = '<div>' + item.product_name + '</div>';

        var itemprice = document.createElement('span');
        itemprice.className = 'badge';
        itemprice.innerHTML = '$' + item.amount;

        var remove = document.createElement('a');
        remove.className = 'remove-button';
        remove.id = item.id;
        remove.innerText ='remove';

        bagitem.appendChild(remove);
        bagitem.appendChild(itemprice);
        $baglist.append(bagitem);
      });

      var total = '<li class=\'list-group-item active\'>' +
        '<span class=\'badge\'>$' + data.amount +
        '</span><b>Your total: </b></li>'

      $baglist.append(total);
      $('.remove-button').click(function() {
        removeItem(this.id);
      });
    },

    error: function(error) {
      console.log(error);
    }
  };

  var removeItem = function(id) {

    var removeConfig = {
      method: 'DELETE',
      url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart/items/' + id,
      success: function(data) {
        console.log(data);
      },
      error: function(error) {
        window.base_ajax(config);
      }
    };

    window.base_ajax(removeConfig);

  };

  window.base_ajax(config);
})();
