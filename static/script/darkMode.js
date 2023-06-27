const mode = localStorage.getItem('theme-mode');
const htmlTag = document.querySelector('html');
const darkModeCheck = document.querySelector('#darkmode-check');

if (mode == undefined) {
  localStorage.setItem('theme-mode', 'retro');
} else {
  htmlTag.setAttribute('data-theme', mode);
  if (mode == 'business') {
    darkModeCheck.checked = true;
  }
}

darkModeCheck.addEventListener('click', (_) => {
  if (darkModeCheck.checked) {
    localStorage.setItem('theme-mode', 'business');
    htmlTag.setAttribute('data-theme', 'business');
  } else {
    localStorage.setItem('theme-mode', 'retro');
    htmlTag.setAttribute('data-theme', 'retro');
  }
});
