jQuery(document).ready(function () {
	var wh = jQuery(window).height();
	var fh = jQuery('.footer').outerHeight();
	var sh = wh-fh;
	jQuery('.main-section').css('min-height', sh +'px');

	//resize js
	jQuery(window).resize(function(){
		var wh = jQuery(window).height();
		var fh = jQuery('.footer').outerHeight();
		var sh = wh-fh;
		jQuery('.main-section').css('min-height', sh +'px');
		jQuery('.section_height').css('height', wh +'px');
	});
	
	jQuery(window).scroll(function () {
		var st = $(this).scrollTop();
        if (st > 50) {
            $('.header').addClass('sticky')
           
        } else {
            $('.header').removeClass('sticky');
           
        }
	});
	jQuery('.login-btn, .login-close').click(function(){
    	jQuery('.login-modal').toggleClass('open');
		jQuery('body').toggleClass('login-modal-on');
	});

	jQuery('.title-with-icon .info-icon').click(function(){
    	jQuery(this).parent().next('.custom-modal').toggleClass('open');
	});
	jQuery('.modal-close').click(function(){
    	jQuery('.custom-modal').removeClass('open');
	});

	jQuery('.dd-btn-col .advance-search-link').click(function(){
    	jQuery('.advance-dd-row').slideToggle();
		jQuery(this).find('.fa').toggleClass('fa-plus').toggleClass('fa-minus');
	});

	
	
	
	// trending slider js
	jQuery('.m-menu').click(function(){
    	jQuery(this).toggleClass('open');
		jQuery('.menu-wrapper').toggleClass('open');
		jQuery('body').toggleClass('body-overlay');
	});
	subMenu();

	// Dashboard menu
	jQuery('.mm-menu').click(function(){
    	jQuery(this).toggleClass('open');
		jQuery('body').toggleClass('body-sidebar-open');
	});
	sidebarMenu();

	if( $('.service-box').length > 0 ){
		$('.service-box').matchHeight()
	}

	jQuery('.accordian-wrapper .accordian-item:first-child').find('.accordian-head').addClass('on');
	jQuery('.accordian-wrapper .accordian-item:first-child').find('.accordian-content').slideDown();

	jQuery('.accordian-head').click(function(){
		if(jQuery(this).next('.accordian-content').is(':visible')){
			jQuery(this).toggleClass('on');
			jQuery(this).next('.accordian-content').slideUp();
		}else{
			jQuery('.accordian-head').removeClass('on');
			jQuery('.accordian-content').slideUp();
			jQuery(this).toggleClass('on');
			jQuery(this).next('.accordian-content').slideDown();
		}
	});
	jQuery('.accordian-filter .expand-btn').click(function(){
		jQuery('.accordian-head').addClass('on');
		jQuery('.accordian-content').slideDown();
	});
	jQuery('.accordian-filter .collapse-btn').click(function(){
		jQuery('.accordian-head').removeClass('on');
		jQuery('.accordian-content').slideUp();
	});

});

function subMenu(){
	jQuery(".nav > li .submenu").before('<span class="mobile-arrow"></span>');
	jQuery(".nav > li > .mobile-arrow").click(function() {
		if(jQuery(this).next("ul.submenu").is(":visible")){
			jQuery(this).next("ul.submenu").slideUp();
			jQuery(this).toggleClass("up");
		}
		else
		{
			jQuery(".nav > li .submenu").slideUp();
			jQuery(".nav > li > .mobile-arrow").removeClass("up");
			jQuery(this).next("ul.submenu").slideDown();
			jQuery(this).toggleClass("up");
		}		
	});
}

// Dashboard Menu
function sidebarMenu(){
	//jQuery(".nav-links > li .submenu").before('<span class="mobile-arrow"></span>');
	jQuery(".nav-links > li.sub-link > a").click(function(e) {
		e.preventDefault();
		if(jQuery(this).next("ul.submenu").is(":visible")){
			jQuery(this).next("ul.submenu").slideUp();
			jQuery(this).toggleClass("up");
		}
		else
		{
			jQuery(".nav-links > li .submenu").slideUp();
			jQuery(".nav-links > li > .mobile-arrow").removeClass("up");
			jQuery(this).next("ul.submenu").slideDown();
			jQuery(this).toggleClass("up");
		}		
	});
}
jQuery(document).ready(function(){
    
	$(".m-menu").click(function(){
		$("body").toggleClass('nav-open');
		$(".header-navigation").slideToggle();
    });

	$('.select-menu').select2();

	$('.banner-slider').slick({
		infinite: true,
		arrows: false,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
    });
	$('.news-slider').slick({
		infinite: true,
		arrows: false,
		dots: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
			{
			breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true,
				}
			}
		]
    });

	$(".about-section .video-frame .img .play-btn").on("click", function (event) {
		$(".about-section .video-frame .img").hide();
		$(".about-section .video-frame .video-main").show();
		$('#platformVideo').trigger('play');
	});

});


$(".nav li.dropdown").each(function() {
    $(this).children("a").after("<span class='arrow'></span>");
});

$(".nav .dropdown .arrow").click(function() {
	if($(this).next(".dropdown-menu").is(":visible")){
	  $(this).next(".dropdown-menu").slideUp();
	  $(this).parent(".dropdown").removeClass("open");
	}
	else
	{
	  $(".dropdown-menu").slideUp();      
	  $(".nav .dropdown").removeClass("open");
	  $(this).next(".dropdown-menu").slideDown();
	  $(this).parent(".dropdown").addClass("open");
	}		
});


// Window Load
$(window).on("load",function(){
	$('.equal-height').matchHeight();
});

$(window).scroll(function(){
	if($(window).scrollTop() > 10)
	{
		$(".header").addClass("fixed");
	}
	else
	{
		$(".header").removeClass("fixed");
	}
});

$(".accordion-paneltitle").click(function(){
	if($(this).parent(".accordion-panelheading").next(".accordion-panelbody").is(":visible"))
	{
		$(this).next(".accordion-panelbody").slideUp();
		$(this).parent(".accordion-panelheading").next(".accordion-panelbody").slideUp();
		$(this).parent(".accordion-panelheading").removeClass("active");
	}
	else
	{
		$(".accordion-panelbody").slideUp();
		$(".accordion-panelheading").removeClass("active");
		$(this).parent(".accordion-panelheading").next(".accordion-panelbody").slideDown();
		$(this).parent(".accordion-panelheading").addClass("active");
	}
});



