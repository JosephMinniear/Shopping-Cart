var updateCost = function() {
    var costArr = [];
    $('tbody tr').each(function (i, item) {
      var linePrice = parseFloat($(item).find('.price').text());
      var quantity = parseFloat($(item).find('.qty input').val());
      var itemCost = linePrice * quantity;
      if(quantity) {
        $(item).children('.cost').html(itemCost.toFixed(2));
        costArr.push(itemCost);
      } else {
        $(item).children('.cost').html('');
      }
    });
    var total = costArr.length > 0 ? costArr.reduce((sum, num) => sum + num) : 0;
    $('#grandTotal').html(total.toFixed(2)); 
  };
  
  var addItem = function() {
    var newItem = $('#item').val();
    var newPrice = parseFloat($('#price').val()).toFixed(2);
    if (!newItem || isNaN(newPrice)) {
      alert('You must enter both item name and unit price to add a new item.');
    } else {
      $('#lastRow').before("<tr><td class='item'>" + newItem + "</td><td class='price'>" + newPrice + "</td><td class='qty'><input type='number'></input></td><td class='cost'></td><td><button class='btn btn-danger btn-xs remove'><i>Remove</i></button></td></tr>");  
    }
    $('tr').find('#item, #price').val('');
  };
  
  var removeItem = function() {
    $(this).closest('tr').remove();
    updateCost();
  };
  
  var updateQty = function () {
    clearTimeout(delay);
    var delay = setTimeout(updateCost, 1000);
  };
  
  $(document).ready(function() {
    updateCost();
    $(document).on('input', '.qty', updateQty);
    $(document).on('click', '.remove', removeItem);
    $(document).on('click', '.add', addItem);
    $('#price').on('keyup', function(event) {
      if (event.key === 'Enter') {
        addItem();
      }
    });
  });