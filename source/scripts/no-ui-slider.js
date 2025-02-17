const SLIDER_MIN = 0;
const SLIDER_MAX = 1047;
const SLIDER_START = 0;
const SECOND_SLIDER_START = 900;
const SLIDER_STEP = 1;

const slider = document.querySelector('#no-ui-slider');
const sliderMinInput = document.querySelector('#no-ui-slider-min');
const sliderMaxInput = document.querySelector('#no-ui-slider-max');

noUiSlider.create(slider, {
  start: [SLIDER_START, SECOND_SLIDER_START],
  connect: true,
  range: {
    'min': SLIDER_MIN,
    'max': SLIDER_MAX
  },
  step: SLIDER_STEP,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return Number.isInteger(parseFloat(value.toFixed(1))) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  sliderMinInput.value = slider.noUiSlider.get()[0];
  sliderMaxInput.value = slider.noUiSlider.get()[1];
});

sliderMinInput.addEventListener('input', () => {
  if (!sliderMinInput.value) {
    slider.noUiSlider.set([0, null]);
  }
  slider.noUiSlider.set([sliderMinInput.value, null]);
});
sliderMaxInput.addEventListener('input', () => {
  if (!sliderMaxInput.value) {
    slider.noUiSlider.set([null, 0]);
  }
  slider.noUiSlider.set([null, sliderMaxInput.value]);
});
