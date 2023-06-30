$('#form-predict-custom').submit(function (e) {
  e.preventDefault();

  $.ajax({
    method: 'POST',
    url: '/',
    data: '{}',
    success: function (e) {
      $('#input-price').html(data.price);
      $('#predicted-discount').html(data.discount);
    },
  });
});
