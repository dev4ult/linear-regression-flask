$('#form-predict-custom').submit(function (e) {
  e.preventDefault();

  const formData = new FormData($('#form-file-upload')[0]);
  formData.append('predictor-value', $('#input-predictor').val());
  formData.append('switch-lane', switchRow);

  $.ajax({
    method: 'POST',
    url: '/predict_custom',
    data: formData,
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      $('#predictor-value').html($('#input-predictor').val());
      $('#predicted-value').html(data.predicted_value);
    },
  });
});
