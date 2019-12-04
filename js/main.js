 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#jg-nav').is(':visible') ) {
				$(this).removeClass('active');
			} 
			else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();
	

	var onePageClick = function() {


		$(document).on('click', '#jg-nav a[href^="#"]', function (event) {
			event.preventDefault();
			//close menu
			$('#jg-nav').removeClass('show');

			var href = $.attr(this, 'href');

			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top - 70
			}, 500, function() {
				// window.location.hash = href;
			});
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
		autoplayHoverPause: false,
		mouseDrag: false,
		touchDrag: true,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.jg_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .jg-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('jg-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.jg-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('jg-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .jg-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn jg-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft jg-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight jg-animated');
							} else {
								el.addClass('fadeInUp jg-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


    var handleFormSubmit = function() {

        const form = $('#contactForm');
	    const url = 'https://jdhwr8oog1.execute-api.us-west-2.amazonaws.com/alpha/contact-us';
	    const submit = $('#submit');
	
        form.on('submit', function (e) {
            e.preventDefault()

            submit.disabled = true;
            
            var inputs = $(this).serializeArray();

            var values = {};
            $.each(inputs, function(k, v){
                values[v.name] = v.value;
            });

            console.log("values: ", values);

            const payload = {
                name: values.name,
                subject: values.subject,
                email: values.email,
                phone: values.phone,
                message: values.message
            }

            $.ajax({
                type: "POST",
                url : url,
                dataType: "json",
                crossDomain: "true",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(payload),
                success: function (response) {
                    $('#emailModal').modal('show');
                    // clear form and show a success message
                    form.trigger('reset');
                    //location.reload();
                },
                error: function (error) {
                    console.log(error);
                    // show an error message
                    alert("UnSuccessfull");
            }});
        })
    }
    handleFormSubmit();

})(jQuery);

