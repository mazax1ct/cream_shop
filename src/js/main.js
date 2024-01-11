//отслеживание скролла для шапки
var header = $('.header'),
    scrollPrev = 0;

var resize_scroll = function(e) {
  var scrolled = $(window).scrollTop();

  if (scrolled > $('.header').height() * 2) {
		header.addClass('is-scrolled');
	} else {
		header.removeClass('is-scrolled');
	}

  if ( scrolled > $('.header').height() && scrolled > scrollPrev ) {
		header.addClass('is-out');
	} else {
		header.removeClass('is-out');
	}

  if($('body').width() < 1200) {
    if (scrolled > scrollPrev || scrolled < scrollPrev) {
      $('.header-search__form-block').removeClass('is-open');
      $('.header-search__opener').find('use').attr('xlink:href', 'images/sprite.svg#search');
    }
  }

	scrollPrev = scrolled;
};

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  //навешивание класса переопределения цвеа текста на шапку
  if($('.js-banner').length){
    if($('.swiper-slide-active').hasClass('is-dark')) {
      $('.header').addClass('is-dark');
    }else{
      $('.header').removeClass('is-dark');
    }
  }
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//открытие главного меню на мобиле
$(document).on('click', '.js-main-menu-opener', function () {
  $('body').addClass('is-overflow');
  $('.main-menu').addClass('is-open');
  return false;
});

//закрытие главного меню на мобиле
$(document).on('click', '.js-main-menu-closer', function () {
  $('body').removeClass('is-overflow');
  $('.main-menu').removeClass('is-open');
  return false;
});

//слайдер баннера на главной
const bannerSlider = new Swiper('.js-banner', {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
  }
});

bannerSlider.on('transitionEnd', function () {
  if($('.swiper-slide-active').hasClass('is-dark')) {
    $('.header').addClass('is-dark');
  }else{
    $('.header').removeClass('is-dark');
  }
});

//открытие поиска
$(document).on('click', '.js-search-opener', function () {
  var _this = $(this);
  if(!$('.header-search__form-block').hasClass('is-open')) {
    $('.header-search__form-block').addClass('is-open');
    if($('body').width() < 1200) {
      _this.find('use').attr('xlink:href', 'images/sprite.svg#close');
    }
  }else{
    $('.header-search__form-block').removeClass('is-open');
    _this.find('use').attr('xlink:href', 'images/sprite.svg#search');
  }

  return false;
});
