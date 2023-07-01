$(document).ready(function (e) {
  let switchRow = false;

  $('.switch-lane').click(function (e) {
    dataset = {
      'first-col': [],
      'second-col': [],
    };

    switchRow = switchRow ? false : true;

    for (let i = 0; i < $('.first-col').length; i++) {
      dataset['first-col'].push($(`#first-col-${i + 1}`).text());
      dataset['second-col'].push($(`#second-col-${i + 1}`).text());

      $(`#first-col-${i + 1}`).html(dataset['second-col'][i]);
      $(`#second-col-${i + 1}`).html(dataset['first-col'][i]);
    }
  });

  $('#labeling-form').submit(function (e) {
    e.preventDefault();

    if ($('#predictand-name').val() && $('#predictor-name').val()) {
      $('#predictand-name').attr('disabled', '');
      $('#predictor-name').attr('disabled', '');
      $('#next-btn').removeAttr('disabled');
      $('#edit-btn').removeClass('hidden');
      $('#submit-btn').addClass('hidden');
      $('#switch-lane-row').addClass('hidden');

      const formData = new FormData($('#form-file-upload')[0]);
      formData.append('predictand', $('#predictand-name').val());
      formData.append('predictor', $('#predictor-name').val());
      formData.append('switch-lane', switchRow);

      $.ajax({
        method: 'POST',
        url: '/set_final_table',
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
          $('#step-3').html(data.html);
        },
      });
    }
  });

  $('#edit-btn').click(function (e) {
    $('#edit-btn').addClass('hidden');
    $('#submit-btn').removeClass('hidden');
    $('#switch-lane-row').removeClass('hidden');
    $('#next-btn').attr('disabled', '');

    $('#predictand-name').removeAttr('disabled', '');
    $('#predictor-name').removeAttr('disabled', '');
  });
});
