let step = 1;

function toStep2() {
  $('#edit-btn').addClass('hidden');
  $('#submit-btn').removeClass('hidden');
  $('#switch-lane-row').removeClass('hidden');
  $('#next-btn').attr('disabled', '');

  $('#predictand-name').removeAttr('disabled', '');
  $('#predictor-name').removeAttr('disabled', '');
}

function nextToStep2() {
  $('#prev-btn').removeClass('hidden');
  $('#next-btn').attr('disabled', '');

  toStep2();

  $('#step-1').addClass('hidden');
  $('#step-2').removeClass('hidden');
}

function backToStep1() {
  $('#prev-btn').addClass('hidden');

  $('#step-1').removeClass('hidden');
  $('#step-2').addClass('hidden');
}

function nextToStep3() {
  $('#next-btn').addClass('hidden');

  $('#step-2').addClass('hidden');
  $('#step-3').removeClass('hidden');
}

function backToStep2() {
  $('#next-btn').removeClass('hidden');

  toStep2();

  $('#step-2').removeClass('hidden');
  $('#step-3').addClass('hidden');
}

$('#next-btn').click(function (e) {
  if (step == 1) {
    nextToStep2();
    step++;
  } else if (step == 2) {
    nextToStep3();
    step++;
  }
});

$('#prev-btn').click(function (e) {
  if (step == 2) {
    backToStep1();
    step--;
  } else if (step == 3) {
    backToStep2();
    step--;
  }
});
