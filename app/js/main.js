;
jQuery(document).ready(function($) {
	var windowWidth = $(window).width();

	if ("ontouchstart" in document.documentElement) {
	    $('body').addClass('touch-device');
	} else {
	    $('body').removeClass('touch-device');
	}

	function alignFooter() {
		var h = $('.footer').outerHeight();

		$('#page').css({
			'padding-bottom': h + 'px',
		});
	}

	if (windowWidth < 850) {
		$('#js-filter-toggle').click(function() {
			$('.catalog__filter-content').toggleClass('active');
		});
	}

	$('#js-filter-close').click(function() {
		$('.catalog__filter-content').removeClass('active');
	});

	$(document).click(function(event) {
		if ((!$(event.target.closest('.catalog__filter-content')).is(".catalog__filter-content")) && $('.catalog__filter-content').hasClass('active') && (!$(event.target.closest('.catalog__filter-top ')).is(".catalog__filter-top "))) {
			$(".catalog__filter-content").removeClass('active');
		}
	});

	alignFooter();

	$(window).resize(function() {
		alignFooter();
	})

	setTimeout(function() {
		$('#mobile-menu').css({
			'opacity': 1,
			'height': 'auto',
			'overflow': 'visible',
		})
	}, 1000);

	$(document).click(function(e) {
		if ((!$(e.target.closest('.header__right')).is('.header__right')) && $('.header__right').hasClass('active')) {
			$('.header__right').removeClass('active');
			resetHeaderSearch();
		}

	})

	function calculateHeaderSearch() {
		var searchW = $('.header__search').outerWidth(true);
		var navW = $('.header__nav').outerWidth(true);
		var searchIcon = $('.header__search-icon').outerWidth(true);
		var searchClose = $('.header__search-close').outerWidth();
		var headerRight = $('.header__right').outerWidth();

		var searchFormLeft = parseInt($('.header__search-form').css('left').split('px')[0], 10);

		var result = searchW + navW;

		if (windowWidth > 920) {
			$('.header__right').css({
				'padding-left': result + 'px',
			});

			$('.header__search-form').css({
				'width': (result - searchIcon - searchClose) + 'px',
			});
		} else if (windowWidth > 650) {
			var mobileHamburger = $('.header__mobile').outerWidth(true);
			var headerLanguages = $('.header__languages').outerWidth(true);
			var headerSocials = $('.header__socials').outerWidth(true);
			var headerBtn = $('.header__callback').outerWidth(true);

			$('.header__search-form').css({
				'width': (headerRight - mobileHamburger - headerLanguages - headerSocials - headerBtn - 30) + 'px',
			});
		} else {
			$('.header__search-form').css({
				'width': (headerRight - 15) + 'px',
			});
		}

		
	}

	function resetHeaderSearch() {
		$('.header__right').css({
			'padding-left': 0,
		});

		$('.header__search-form').addClass('hide');

		$('.header__search-form').css({
			'width': 0,
		})

		setTimeout(function() {
			$('.header__search-form').removeClass('hide');
		}, 500);
	}

	$('#js-search-open').click(function(e) {
		$(this).closest('.header__right').addClass('active');
		calculateHeaderSearch();
	});

	$('#js-search-close').click(function(e) {
		$(this).closest('.header__right').removeClass('active');
		resetHeaderSearch();
	});

	$('.js-question-toggle').click(function() {
		$(this).closest('.faq__item').toggleClass('active');
	});


	function alignBannerControls() {
		var gallery = $('.banner__slide-gallery');
		var position = $(gallery).position();
		var w = $(gallery).outerWidth();
		var h = $(gallery).outerHeight();
		
		var dotsWidth = $('.banner__dot').outerWidth();
		var arrowH = $('.banner__arrows .arrow').outerHeight();

		var right = windowWidth - (position.left + w);
		var offsetRight = (w - dotsWidth) / 2;

		$('.banner__dot').css({
			'right': right + 'px',
			'transform': 'translateX(-' + offsetRight + 'px)',
		});

		$('.banner__arrows .arrow--prev').css({
			'left': (position.left) + 'px',
			'top': ((position.top + h / 2) - (arrowH / 2)) + 'px', 
		});

		$('.banner__arrows .arrow--next').css({
			'right': (windowWidth - position.left - w) + 'px',
			'top': ((position.top + h / 2) - (arrowH / 2)) + 'px', 
		});
	}

	$(window).resize(function() {
		windowWidth = $(window).width();
	});

	

	if ($('.styled-select').length) {
		$('.styled-select').each(function() {
        $(this).selectmenu({
        	appendTo: '.modal-inner',
          position: {
              of: $(this).closest('.form-group'),
              collision: 'flipfit',
              my: 'left-50% top+10',
              at: 'center top+40',
          }
        });
    });
	}

	
	(function hideShareToggleBtn() {
		var sharesItems = $('.shares-item .new__content').find('.new__item');
		if (windowWidth <= 620 && sharesItems.length <= 2) {
			$('#js-shares-items-toggle').css({
				'display': 'none',
			});
		} else if (windowWidth > 620 && windowWidth <= 991 && sharesItems.length <= 4) {
			$('#js-shares-items-toggle').css({
				'display': 'none',
			});
		} else if (windowWidth > 991 && sharesItems.length <= 6) {
			$('#js-shares-items-toggle').css({
				'display': 'none',
			});
		}
	})();

	$('.shares-item .new__content').find('.new__item').each(function() {
		var index = 0;
		if (windowWidth <= 620) {
			index = 1;
		} else if (windowWidth >= 620 && windowWidth <= 991) {
			index = 3;
		} else {
			index = 5;
		}

		if ($(this).index() > index) {
			$(this).addClass('new__item--hide');
		}
	});

	$('#js-shares-items-toggle').click(function(e) {
		e.preventDefault();

		var index = 0;
		if (windowWidth <= 620) {
			index = 1;
		} else if (windowWidth >= 620 && windowWidth <= 991) {
			index = 3;
		} else {
			index = 5;
		}

		if ($('.shares-item__offers-wrapper').hasClass('active')) {
			$('.shares-item__offers-wrapper').removeClass('active')
			$(this).html('<span class="btnflip-item btnflip__front">просмотреть все</span><span class="btnflip-item btnflip__center"></span><span class="btnflip-item btnflip__back">просмотреть все</span>');

			$('.shares-item .new__content').find('.new__item').each(function() {
				if ($(this).index() > index) {
					$(this).addClass('new__item--hide');
				}
			});
		} else {
			$('.shares-item__offers-wrapper').addClass('active')
			$(this).html('<span class="btnflip-item btnflip__front">скрыть</span><span class="btnflip-item btnflip__center"></span><span class="btnflip-item btnflip__back">скрыть</span>');

			$('.shares-item .new__content').find('.new__item').each(function() {
				$(this).removeClass('new__item--hide');
			});
		}
	});

	window.onload = function () {
	
		if ($('.new__item').length) {
			setNewItemHeight();
		}

		if ($('.share__slide-img').length) {
			alignShareInfo();
		}

		if ($('.banner').length) {
			alignBannerControls();
		}

		if ($('.footer').length) {
			alignFooter();
		}
	}

	$('.form-group--hover :input').focusin(function(e) {
		$(this).closest('.form-group').addClass('active');
	});

	$('.callback-modal form').click(function(e) {
		if (!$(event.target.closest('input[type="submit"]')).is('input[type="submit"]')) {
			e.preventDefault();
		}
	});


	$('.form-group--hover').focusout(function(e) {
		$(this).removeClass('active');

		if ($(this).find(':input').val() === '') {
			$(this).removeClass('active-no-label');
		} else {
			$(this).addClass('active-no-label');
		}
	});

	if ($('.new__item').length) {

		function setNewItemHeight() {
			if (!($('body').hasClass('touch-device'))) {
				$('.new__item').each(function() {
					var h = $(this).outerHeight();

					$(this).css({
						'height': h + 'px',
					});
					
				});
			}
		}

		$(window).resize(function() {
			setNewItemHeight();
		})
	}
	

	if ($('#banner__slider').length) {
		var bannerSlider = $('#banner__slider');
		$(bannerSlider).on('init', function(e, slick) {
			alignBannerControls();
			$(slick.$slider[0]).css({
				'opacity': 1,
			})

			var activeSlide = $(bannerSlider).find('.slick-slide.slick-active');
			$(activeSlide).find('.banner__slide-inner').addClass('animated');
		});

		$(bannerSlider).on('beforeChange', function(e, slick, currentSlide, nextSlide) {
			var cSlide = $(slick)[0].$slides[currentSlide];
			var nSlide = $(slick)[0].$slides[nextSlide];

			$(cSlide).find('.banner__slide-inner').removeClass('animated');
			$(nSlide).find('.banner__slide-inner').addClass('animated');
		});

		$(window).resize(function() {
			alignBannerControls();
		});

		$('#banner__slider').slick({
			appendArrows: '.banner__arrows',
			touchThreshold: 5000,
			prevArrow: '<button class="arrow arrow--prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/></g></svg></button>',
			nextArrow: '<button class="arrow arrow--next"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/></g></svg></button>',
			dots: true,
			appendDots: '.banner__dots',
			dotsClass: 'banner__dot dot flex ai-c jc-c',
			fade: true,
		});
	};

	if ($('#js-category-slider').length) {
		var categorySlider = $('#js-category-slider');

		$(categorySlider).on('init', function(e, slick) {
			var slider = $(slick)[0].$slider[0];

			var h = $(slider).find('.slick-track').height();

			$(slider).find('.slick-slide').each(function() {
				$(this).css('height', h + 'px' );
			});
		});

		$(categorySlider).slick({
			slidesToShow: 4,
			touchThreshold: 5000,
			appendArrows: '.category__arrows',
			prevArrow: '<button class="arrow arrow--prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/></g></svg></button>',
			nextArrow: '<button class="arrow arrow--next"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/></g></svg></button>',
			responsive: [
				{
					breakpoint: 810,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
					}
				}
			]
		});
	}

	if ($('#mobile-menu').length) {
		$('#mobile-menu').mmenu({
			navbars: {
				content : [ "close" ],
			},
			navbar: {
				title: 'Frime'
			}
		});
	}

	function alignShareInfo() {
		var max = 0;

		if (windowWidth > 470) {
			$('.js-slide-info').each(function() {
				var h = $(this).outerHeight(true);

				if (h > max) {
					max = h;
				}
			})

			$('.js-slide-info').each(function() {
				$(this).css({
					'height': max + 'px',
				});
			})
		}
	}



	if ($('#js-share-slider').length) {
		$('#js-share-slider').slick({
			slidesToShow: 3,
			touchThreshold: 5000,
			appendDots: '.share__dots',
			dotsClass: 'share__dot dot flex ai-c jc-c',
			dots: true,
			slidesToScroll: 3,
			arrows: false,
			responsive: [
				{
					breakpoint: 650,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 470,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});


		$(window).resize(function() {
			alignShareInfo();
		});
	}

	if ($('.product__gallery-main-slide-inner').length) {
		if (!($('body').hasClass('touch-device'))) {
			$('.product__gallery-main-slide-inner').each(function() {
				$(this).imgZoom();
			})
		}
		
	}

	if ($('#js-product-main').length) {
		var productMainSlider = $('#js-product-main');

		$(productMainSlider).on('init', function(e, slider) {
			$(slider.$slider[0]).css({
				'opacity': 1,
			})
		});

		$(productMainSlider).slick({
			arrows: false,
			touchThreshold: 5000,
		});
	}

	if ($('#js-product-previews').length) {
		var productPreviewsSlider = $('#js-product-previews');

		$(productPreviewsSlider).on('init', function(e, slider) {
			$(slider.$slider[0]).css({
				'opacity': 1,
			})
		});

		$(productPreviewsSlider).slick({
			asNavFor: '#js-product-main',
			slidesToShow: 4,
			touchThreshold: 5000,
			focusOnSelect: true,
			arrows: false
		});
	}


	$('#js-toggle-seo').click(function(e) {
		e.preventDefault();

		var seoContent = $(this).closest('.seo__content');
		$(seoContent).toggleClass('active');

		if ($(seoContent).hasClass('active')) {
			$(this).find('span').text('Скрыть');
		} else {
			$(this).find('span').text('Читать полностью');
		}
	});

	if ($('.js-circle-text').length) {
		$('.js-circle-text').each(function() {
			var parent = $(this).closest('.banner__slide-video');

			var p = document.createElement('p');
			p.classList.add('banner__slide-round');

			var str = $(this).text().split('');
			var count = 0;

			for (var i = 0; i < str.length; i++) {
				var span = document.createElement('span');
				span.textContent = str[i];

				$(span).css({
					'transform': 'rotate(' + count + 'deg)',
				});

				count += 10;

				$(p).append(span);
			}
			
			$(parent).prepend(p);
			$(this).remove();
		});
	};

});