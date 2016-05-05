(function(){

  var config = {
    method: 'GET',
    url: 'http://shoppingcart-mcfadyenbrazil.rhcloud.com/api/shoppingcart',
    success: function(data) {
      var $baglist = $('.list-group');

      $.map(data.items, function(item, i) {
        var bagitem = document.createElement('li');
        bagitem.className = 'list-group-item';
        bagitem.innerHTML = item.product_name;

        var itemprice = document.createElement('span');
        itemprice.className = 'badge';
        itemprice.innerHTML = item.amount;

        var remove = document.createElement('a');
        remove.className = 'remove-button';
        remove.id = 'remove' + item.id;
        remove.innerText ='remove';

        bagitem.appendChild(itemprice);

        //$baglist.append(remove);
        $baglist.append(itemprice);
        $baglist.append(bagitem);
      });



    },
    error: function(error) {
      console.log(error);
    }
  };

  window.base_ajax(config);
})();
