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
  if($('.js-banner').length) {
    if($('.swiper-slide-active').hasClass('is-dark')) {
      $('.header').addClass('is-dark');
    }else{
      $('.header').removeClass('is-dark');
    }
  }

  //деталка слайдер
  if($('.js-detail').length && $('body').width() < 768) {
    const detailSlider = new Swiper('.js-detail', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      }
    });
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
if($('.js-banner').length) {
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
}

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

//тогглер фильтра
$(document).on('click', '.js-filter-toggler', function () {
  $(this).toggleClass('is-active');
  $('.filter').slideToggle();
  return false;
});

//тогглер раздела фильтра
$(document).on('click', '.js-filter-section-toggler', function () {
  $(this).toggleClass('is-active');
  $(this).closest('.filter__section').find('.filter__section-inner').slideToggle();
  return false;
});

//тогглер аккордеона
$(document).on('click', '.js-accordion-toggler', function () {
  var _this = $(this);
  if($(this).hasClass('is-active')) {
    _this.closest('.accordion').find('.accordion__body').slideUp();
    _this.find('use').attr('xlink:href', 'images/sprite.svg#plus');
    _this.removeClass('is-active');
  }else{
    _this.closest('.accordion').find('.accordion__body').slideDown();
    _this.find('use').attr('xlink:href', 'images/sprite.svg#minus');
    _this.addClass('is-active');
  }
  return false;
});

//слайдер рекомендаций
if($('.js-recommendations').length){
  const recommendationsSlider = new Swiper('.js-recommendations', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      480: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}

//тогглер товаров в оформлении заказа
$(document).on('click', '.js-goods-toggler', function () {
  $(this).toggleClass('is-active');
  $('.order-make__goods').slideToggle('');
  return false;
});
