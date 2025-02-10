// swiper slider setting
const initSlider = () => {
  const slider = new Swiper('.other-slider', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
