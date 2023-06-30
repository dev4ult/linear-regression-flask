$('#form-predict-discount').submit(function (e) {
  e.preventDefault();

  $.ajax({
    method: 'POST',
    url: '/example',
    data: { price: $('input[name="price"]').val() },
    success: function (data) {
      $('#input-price').html(data.price);
      $('#predicted-discount').html(data.discount);
    },
  });
});
