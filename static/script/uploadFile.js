$(document).ready(function (e) {
  function enterContainer() {
    $('#upload-container').addClass('bg-accent');
    $('#upload-container').removeClass('text-accent');
    $('#browse-file').addClass('btn-neutral');
    $('#browse-file').removeClass('btn-accent');
  }

  function leaveContainer() {
    $('#upload-container').addClass('text-accent');
    $('#upload-container').removeClass('bg-accent');
    $('#browse-file').addClass('btn-accent');
    $('#browse-file').removeClass('btn-neutral');
  }

  $('#upload-container').on('dragenter', function (e) {
    e.preventDefault();
    e.stopPropagation();
    enterContainer();
  });

  $('#upload-container').on('dragleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    leaveContainer();
  });

  $('#upload-container').on('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
    enterContainer();
  });

  function displayFile(fileName) {
    $('#drop-file-cmd').addClass('hidden');
    $('#file-name').html(fileName);
    $('#error-file').addClass('hidden');

    $('#remove-file').removeClass('hidden');
    $('#submit-file').removeClass('hidden');
  }

  $('#upload-container').on('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const draggedData = e.originalEvent.dataTransfer;
    const files = draggedData.files;

    const fileFormat = files[0].name.split('.')[1];

    if (fileFormat == 'xlsx') {
      $('#excel-icon').removeClass('hidden');
    } else if (fileFormat == 'csv') {
      $('#csv-icon').removeClass('hidden');
    } else {
      $('#error-file').removeClass('hidden');
      leaveContainer();
      return;
    }

    displayFile(files[0].name);
  });

  $('#upload-file').on('change', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const file = this.files[0];
    const fileFormat = file.name.split('.')[1];
    if (fileFormat == 'xlsx') {
      $('#excel-icon').removeClass('hidden');
    } else if (fileFormat == 'csv') {
      $('#csv-icon').removeClass('hidden');
    } else {
      $('#error-file').removeClass('hidden');
      return;
    }

    displayFile(file.name);

    enterContainer();
  });

  function hideIcon() {
    $('#excel-icon').addClass('hidden');
    $('#csv-icon').addClass('hidden');
  }

  $('#remove-file').click(function (e) {
    $('#remove-file').addClass('hidden');
    $('#submit-file').addClass('hidden');

    $('#drop-file-cmd').removeClass('hidden');
    $('#file-name').html('');
    $('#next-btn').attr('disabled', '');
    leaveContainer();
    hideIcon();
  });

  $('#submit-file').click(function (e) {
    $('#next-btn').removeAttr('disabled');

    const formData = new FormData($('#form-file-upload')[0]);

    $.ajax({
      method: 'POST',
      url: '/',
      data: formData,
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        $('#labeling-form').html(data.html);
      },
    });
  });
});
