$(document).ready( function() {
  $('#plan').on('change', function() {
    var priceText;

    switch(this.value) {
      case 'monthly':
        priceText = '$50.00 / mo';
        break;
      case 'quarterly':
        priceText = '$40.00 / mo';
        break;
      case 'yearly':
        priceText = '$30.00 / mo';
        break;
    }

    $('#price').text(priceText);

  });

  $('#add').on('click', function() {
    var plan = $('#plan');
    var installment = plan.val();
    var price = $('#price').text();
    var inCart = $('#in-cart');
    // inCart.append('<li>' + installment + ' - ' + price + '</li>');
    // inCart.append(`<li> ${installment} - ${price} </li>`);
    var numeric = price.replace(/[[A-Za-z$\/\s]/g, '');
    var data = 'data-price="' + numeric + '" data-plan="' + installment + '"';
    inCart.append('<li class="entry"' + data + '>' + installment + ' - ' + price + '  <button class="remove">X</button></li>');
    // inCart.append(`<li class='entry' ${data}> ${installment} - ${price} </li>`)
    updateTotal();
  });

  function updateTotal() {
    var total = 0;
    var entries = $('.entry');

    if(entries.length)
      $('#empty').show();
    else
      $('#empty').hide();

      entries.each( function(index, entry) {
      var data = $(entry).data();
      var price = parseFloat(data.price);
      var installment = data.plan;
      switch(installment) {
        case 'monthly':
          total += price;
          break;
        case 'quarterly':
          total += price * 4;
          break;
        case 'yearly':
          total += price * 12;
          break;
      }
    });

    $('#total').text('$' + total);
  }

  $('#empty').on('click', function() {
    $('#in-cart').empty();
    updateTotal();
  });

  $(document).on('click', '.remove', function() {
    $(this).parents('li').remove();
    updateTotal();
  });

  $('#display-cart').on('click', function() {
    var cart = $('#cart');
    var button = $(this);

    if(button.text() === 'Hide Cart')
      button.text('Show Cart');
    else
      button.text('Hide Cart');

    cart.slideToggle(); //you can pass in seconds

  });

  $('#purchase').on('click', function() {
    $('#complete')
      .html('<h5>PURCHASE COMPLETE</h5>')
      .css({
        'background-color': '#bca',
        'width': '45%',
        'border': '1px solid green',
        'text-align': 'center'
      })
      .animate({
        width: '70%',
        opacity: 0.8,
        marginLeft: '0.6in',
        fontSize: '2em',
        borderWidth: '10px'
      }, 1500);
  });

});
