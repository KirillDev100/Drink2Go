const SLIDER_DELAY = 2000;
const hero = document.querySelector('.hero');
const slides = hero.querySelectorAll('.hero-slider__hero-slide');
const sliderPaginationButtons = hero.querySelectorAll('.slider-pagination__input');
const sliderPrev = hero.querySelector('.slider-button-prev');
const sliderNext = hero.querySelector('.slider-button-next');

let slidesCounter = 0;

//Другая версия реализации слайдера, проще, но без анимаций
// const updateSlider = (currentSlide) => {
//   slides.forEach((slide) => {
//     slide.style.order = 0;
//   });
//   slides[currentSlide].style.order = -1;

//   sliderNext.disabled = slidesCounter >= slides.length - 1;
//   sliderPrev.disabled = slidesCounter <= 0;
// };

sliderPrev.disabled = slidesCounter <= 0;
let isAnimating = false;

const updateSlider = (currentSlide) => {
  isAnimating = true;
  sliderPaginationButtons[currentSlide].checked = true;
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${-currentSlide * 100}%)`;
  });

  sliderPrev.disabled = currentSlide <= 0;
  sliderNext.disabled = currentSlide >= slides.length - 1;
  setTimeout(() => {
    isAnimating = false;
  }, SLIDER_DELAY);

  hero.classList.remove(...hero.classList);
  hero.classList.add('page__hero');
  hero.classList.add('hero');
  hero.classList.add(`hero--${slides[currentSlide].dataset.background}`);
};

sliderNext.addEventListener('click', () => {
  if (isAnimating) {
    return;
  }
  slidesCounter++;
  updateSlider(slidesCounter);
});

sliderPrev.addEventListener('click', () => {
  if (isAnimating) {
    return;
  }
  slidesCounter--;
  updateSlider(slidesCounter);
});

sliderPaginationButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (button.checked) {
      slidesCounter = index;
      updateSlider(slidesCounter);
    }
  });
});
