const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player-slider');
let mousedown = false;

// Function for video playing/pausing
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Function for play/pause button
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Function for skipping video in time
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Function for changing values of speed and volume
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Function for showing video progress
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Function for scrubbing the video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
