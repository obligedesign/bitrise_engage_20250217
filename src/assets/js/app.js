// swiper slider setting
const initSlider = () => {
  const slider = new Swiper('.swiper', {
    loop: true,
    allowTouchMove: false,
    centeredSlides: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  })
}

// inview setting
const initInview = () => {
  $(function () {
    $('.js-fadeLeft').on('inview', function () {
      $(this).addClass('is-view')
    })
  })

  $(function () {
    $('.js-fadeRight').on('inview', function () {
      $(this).addClass('is-view')
    })
  })

  $(function () {
    $('.js-fadeUp').on('inview', function () {
      $(this).addClass('is-view')
    })
  })
}

// cta visible setting
const initShowCta = () => {
  window.addEventListener('scroll', () => {
    const mvBottom = document.querySelector('.mv').getBoundingClientRect().bottom;
    document.body.classList.toggle('is-visible-cta', window.scrollY > mvBottom);
  });
};


window.addEventListener('load', () => {
  initSlider()
  initInview()
  initShowCta()
})

window.addEventListener('resize', () => {
  initShowCta()
})
