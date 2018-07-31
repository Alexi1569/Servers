;
jQuery(document).ready(function($) {
	var windowWidth = $(window).width();

	function calculateHeaderSearch() {
		var searchW = $('.header__search').outerWidth(true);
		var navW = $('.header__nav').outerWidth(true);
		var searchIcon = $('.header__search-icon').outerWidth(true);
		var searchClose = $('.header__search-close').outerWidth();
		var headerRight = $('.header__right').outerWidth();

		var searchFormLeft = parseInt($('.header__search-form').css('left').split('px')[0], 10);

		var result = searchW + navW;

		if (windowWidth > 767) {
			$('.header__right').css({
				'padding-left': result + 'px',
			});

			$('.header__search-form').css({
				'width': (result - searchIcon - searchClose) + 'px',
			});
		} else if (windowWidth > 580) {
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

	$('.form-group--hover').focusin(function(e) {
		$(this).addClass('active');
	})

	if ($('.styled-select').length) {
		$('.styled-select').each(function() {
			$(this).SumoSelect({
				floatWidth: 250,
			})
		});
	}

	$('.form-group--hover').focusout(function(e) {
		$(this).removeClass('active');

		if ($(this).find('input').val() === '') {
			$(this).removeClass('active-no-label');
		} else {
			$(this).addClass('active-no-label');
		}
	})

	if ($('#banner__slider').length) {
		var bannerSlider = $('#banner__slider');
		$(bannerSlider).on('init', function(e, slick) {
			alignBannerControls();

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

	if ($('#js-share-slider').length) {
		$('#js-share-slider').slick({
			slidesToShow: 3,
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

		alignShareInfo();

		$(window).resize(function() {
			alignShareInfo();
		});
	}

	if ($('.product__gallery-main-slide-inner').length) {
		if (windowWidth > 991) {
			$('.product__gallery-main-slide-inner').each(function() {
				$(this).imgZoom();
			})
		}
		
	}

	if ($('#js-product-main').length) {
		$('#js-product-main').slick({
			arrows: false,
		});
	}

	if ($('#js-product-previews').length) {
		$('#js-product-previews').slick({
			asNavFor: '#js-product-main',
			slidesToShow: 4,
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