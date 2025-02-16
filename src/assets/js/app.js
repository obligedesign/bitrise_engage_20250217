// メインビジュアルの Swiper 設定
const initMvSlider = () => {
  new Swiper('.mv-slider', {
    loop: true,
    allowTouchMove: false,
    centeredSlides: true,
    speed: 1000,
    autoplay: { delay: 4000 },
    effect: 'fade',
    fadeEffect: { crossFade: true },
  });
};

// 転職成功事例の Swiper 設定
let successSlider;

const initSuccessSlider = () => {
  if (window.innerWidth < 769) {
    if (!successSlider) {
      successSlider = new Swiper('.success-slider', {
        slidesPerView: 1,
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  } else {
    if (successSlider) {
      successSlider.destroy(true, true);
      successSlider = null;
    }
  }
};

// CTA の表示制御
const handleCtaVisibility = () => {
  const mvBottom = document.querySelector('.mv')?.getBoundingClientRect().bottom || 0;
  document.body.classList.toggle('is-visible-cta', window.scrollY > mvBottom);
};

// 画面リサイズ時の処理
const handleResize = () => {
  initSuccessSlider();
  handleCtaVisibility();
};

// 初期化処理
window.addEventListener('load', () => {
  initMvSlider();
  initSuccessSlider();
  handleCtaVisibility();
});

// リサイズ時に処理を最適化
window.addEventListener('resize', handleResize);