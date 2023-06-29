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
  $('#remove-file').removeClass('hidden');
  $('#file-name').html(fileName);
  $('#error-file').addClass('hidden');

  $('#next-btn').removeAttr('disabled');
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
  Array.from(this.files).forEach((file) => {
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
});

function hideIcon() {
  $('#excel-icon').addClass('hidden');
  $('#csv-icon').addClass('hidden');
}

$('#remove-file').click(function (e) {
  $('#remove-file').addClass('hidden');
  $('#drop-file-cmd').removeClass('hidden');
  $('#step-2').addClass('hidden');
  $('#file-name').html('');
  leaveContainer();
  hideIcon();
});

let step = 1;

function nextToStep2() {
  $('#prev-btn').removeClass('hidden');

  $('#step-1').addClass('hidden');
  $('#step-2').removeClass('hidden');
}

$('#next-btn').click(function (e) {
  $('#next-btn').attr('disabled', '');
  nextToStep2();
});

function backToStep1() {
  $('#prev-btn').addClass('hidden');

  $('#step-1').removeClass('hidden');
  $('#step-2').addClass('hidden');
}

$('#prev-btn').click(function (e) {
  $('#next-btn').removeAttr('disabled');
  backToStep1();
});
