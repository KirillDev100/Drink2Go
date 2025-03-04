//Задержка равна длительности анимации для предотвращения артефактов и багов, связанных с плавным переходом свойства transform
const SLIDER_DELAY = 2000;

const hero = document.querySelector('.hero');
const slides = hero.querySelectorAll('.hero-slider__hero-slide');
const slider = hero.querySelector('.hero-slider');
const sliderPaginationButtons = hero.querySelectorAll('.slider-pagination__button');
const sliderPrev = hero.querySelector('.slider-button-prev');
const sliderNext = hero.querySelector('.slider-button-next');

let slidesCounter = 0;
sliderPrev.disabled = slidesCounter <= 0;
let isAnimating = false;
const updateSlider = (currentSlide) => {
  isAnimating = true;
  sliderPaginationButtons.forEach((paginationButton) => {
    paginationButton.classList.remove('slider-pagination__button--current');
  });
  sliderPaginationButtons[currentSlide].classList.add('slider-pagination__button--current');
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
  button.addEventListener('click', (evt) => {
    sliderPaginationButtons.forEach((paginationButton) => {
      paginationButton.classList.remove('slider-pagination__button--current');
    });
    evt.target.classList.add('slider-pagination__button--current');
    slidesCounter = index;
    updateSlider(slidesCounter);
  });
});

const sliderPreventKeyDown = (evt) => {
  if (evt.key === 'Tab') {
    if (isAnimating) {
      evt.preventDefault();
      return;
    }

    if (slidesCounter < slides.length - 1) {
      evt.preventDefault();
      slidesCounter++;
      updateSlider(slidesCounter);
      setTimeout(() => {
        slides[slidesCounter].querySelector('.hero-slide__button').focus();
      }, SLIDER_DELAY);
    }
  }
};

slider.addEventListener('focusin', () => {
  document.addEventListener('keydown', sliderPreventKeyDown);
});

slides[0].addEventListener('focusin', () => {
  if (slidesCounter !== 0) {
    slidesCounter = 0;
    updateSlider(slidesCounter);
  }
});

slider.addEventListener('focusout', () => {
  document.removeEventListener('keydown', sliderPreventKeyDown);
});
