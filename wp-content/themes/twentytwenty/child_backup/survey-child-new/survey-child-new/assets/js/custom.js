jQuery(document).ready(function () {
  jQuery(".m-menu").click(function () {
    jQuery("body").toggleClass("nav-open");
    jQuery(".header-navigation").slideToggle();
  });

  jQuery(".select-menu").select2();

  jQuery(".banner-slider").slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  jQuery(".news-slider").slick({
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
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
    ],
  });

  jQuery(".about-section .video-frame .img .play-btn").on(
    "click",
    function (event) {
      jQuery(".about-section .video-frame .img").hide();
      jQuery(".about-section .video-frame .video-main").show();
      jQuery("#platformVideo").trigger("play");
    }
  );

  jQuery(".login-btn, .login-close").click(function () {
    jQuery(".login-modal").toggleClass("open");
    jQuery("body").toggleClass("login-modal-on");
  });

  jQuery(".title-with-icon .info-icon").click(function () {
    jQuery(this).parent().next(".custom-modal").toggleClass("open");
  });
  jQuery(".modal-close").click(function () {
    jQuery(".custom-modal").removeClass("open");
  });

  jQuery(".dd-btn-col .advance-search-link").click(function () {
    jQuery(".advance-dd-row").slideToggle();
    jQuery(this).find(".fa").toggleClass("fa-plus").toggleClass("fa-minus");
  });

  jQuery(".go-down").click(function () {
    var target = jQuery("div.active1").next("div");
    console.log(target.length);
    if (target.length == 0) {
      target = jQuery("div.grid-section");
    }
    if (jQuery("#content div:nth-last-child(2)").hasClass("active1")) {
      jQuery(".go-down").addClass("go-up");
    } else {
      jQuery(".go-down").removeClass("go-up");
    }
    jQuery("html, body").animate(
      {
        scrollTop: target.offset().top,
      },
      "slow"
    );

    jQuery(".active1").removeClass("active1");
    target.addClass("active1");

    //   console.log(target);

    if (target.hasClass("active1")) {
      var get_id = target.attr("id");
      var get_menu_id = jQuery("#survey");
      console.log(get_id);
      console.log("-------------");
      console.log(get_menu_id);

      if (get_id == "about") {
        jQuery("#survey").find("li:nth-child(2)").addClass("active");
      }
      if (get_id == "resources") {
        jQuery("#survey").find("li:nth-child(2)").removeClass("active");
        jQuery("#survey").find("li:nth-child(3)").addClass("active");
      }
      if (get_id == "gallery") {
        jQuery("#survey").find("li:nth-child(3)").removeClass("active");
        jQuery("#survey").find("li:nth-child(5)").addClass("active");
      }

      if (get_id == "faq") {
        jQuery("#survey").find("li:nth-child(5)").removeClass("active");
        jQuery("#survey").find("li:nth-child(6)").addClass("active");
      } else {
        jQuery("#survey").find("li:nth-child(6)").removeClass("active");
      }

      if (get_id == "grid-section") {
        jQuery("#survey").find("li:nth-child(6)").removeClass("active");
        jQuery("#survey").find("li:nth-child(1)").addClass("active");
      } else {
        jQuery("#survey").find("li:nth-child(1)").removeClass("active");
      }
    }
  });

  // jQuery("#sortbox").change(function () {
  //   var sortby = jQuery(this).val();
  //   var sortbyck = new Date();
  //   sortbyck.setTime(sortbyck.getTime() + 60 * 1000);
  //   Cookies.set(
  //     "sorting",
  //     sortby,
  //     { sameSite: "strict" },
  //     { expires: sortbyck }
  //   );
  //   location.reload();
  // });

  var value = jQuery(".res-filter").find(":selected").val();
  jQuery(".dflt").text(value);
  //alert(value);
  jQuery(".res-filter").change(function () {
    var url = window.location.href;
    var newURL = new URL(url);
    value = jQuery(".res-filter").find(":selected").val();
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + 60 * 1000);
    Cookies.set("cat-name", value, { sameSite: "strict" }, { expires: expiry });
    location.reload();
  });

  jQuery("#sortbox").change(function () {
    // var url = window.location.href;
    // var newURL = new URL(url);
    value = jQuery("#sortbox").find(":selected").val();
    // var expiry = new Date();
    // expiry.setTime(expiry.getTime() + 60 * 1000);
    // Cookies.set("sorting", value, { sameSite: "strict" }, { expires: expiry });
    

    setCookie('sorting', value, 100);
    location.reload();

  });

  if(getCookie('sorting') == 'ASC'){
    jQuery("#sortbox option:nth-child(2)").prop("selected", true);
  }

  if(getCookie('sorting') == 'DESC'){
    jQuery("#sortbox option:nth-child(1)").prop("selected", true);
  }
// faqs based on language
  jQuery('.faq_qna').hide();
  var first = jQuery('.select-lang option:first-child').val();
  //console.log(first);
  jQuery('.'+first+'.faq_qna').show();
  jQuery('.select-lang').change(function(){
    var lang = jQuery(this).val();
    jQuery('.faq_qna').siblings().hide();
    jQuery('.'+lang+'.faq_qna').show();
    console.log(lang);
  });
 //   Counter  js
	
  if (jQuery(".counter").length) {
		jQuery('.counter').counterUp({
			delay: 10,
			time:1000
		});
	}


});

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}


jQuery(".nav li.dropdown").each(function () {
  jQuery(this).children("a").after("<span class='arrow'></span>");
});

jQuery(".nav .dropdown .arrow").click(function () {
  if (jQuery(this).next(".dropdown-menu").is(":visible")) {
    jQuery(this).next(".dropdown-menu").slideUp();
    jQuery(this).parent(".dropdown").removeClass("open");
  } else {
    jQuery(".dropdown-menu").slideUp();
    jQuery(".nav .dropdown").removeClass("open");
    jQuery(this).next(".dropdown-menu").slideDown();
    jQuery(this).parent(".dropdown").addClass("open");
  }
});

// Window Load
jQuery(window).on("load", function () {
  jQuery(".equal-height").matchHeight();
});

jQuery(window).scroll(function () {
  if (jQuery(window).scrollTop() > 10) {
    jQuery(".header").addClass("fixed");
  } else {
    jQuery(".header").removeClass("fixed");
  }
});

jQuery(".accordion-paneltitle").click(function () {
  if (
    jQuery(this)
      .parent(".accordion-panelheading")
      .next(".accordion-panelbody")
      .is(":visible")
  ) {
    jQuery(this).next(".accordion-panelbody").slideUp();
    jQuery(this)
      .parent(".accordion-panelheading")
      .next(".accordion-panelbody")
      .slideUp();
    jQuery(this).parent(".accordion-panelheading").removeClass("active");
  } else {
    jQuery(".accordion-panelbody").slideUp();
    jQuery(".accordion-panelheading").removeClass("active");
    jQuery(this)
      .parent(".accordion-panelheading")
      .next(".accordion-panelbody")
      .slideDown();
    jQuery(this).parent(".accordion-panelheading").addClass("active");
  }
});
// $(document).ready(function() {
// $(".down").click(function() {
//      $('html, body').animate({
//          scrollTop: $(".up").offset().top
//      }, 15);
//  });
// });

// $(document).ready(function() {
// $(".up").click(function() {
//      $('html, body').animate({
//          scrollTop: $(".down").offset().top
//      }, 10);
//  });
// });

$("#back_btn").click(function () {
  window.history.back();
});

$(".lrm-close-form").click(function () {
  location.reload();
});

$("#survey").on("click", "li", function () {
  // remove classname 'active' from all li who already has classname 'active'
  $("#survey li.active").removeClass("active");
  // adding classname 'active' to current click li
  $(this).addClass("active");
});


// footer to down

if($("#wrapper").length){
    var footer_height = $("footer").outerHeight();
    var page_height = $(window).height() - footer_height;
    $("#wrapper").css("min-height", page_height + "px");
}

$(window).resize(function(){
    if($("#wrapper").length){
        var footer_height = $("footer").outerHeight();
        var page_height = $(window).height() - footer_height;
        $("#wrapper").css("min-height", page_height + "px");
    }
});

// slider counter
if ($("body.page-template-page-templatespage-home-php").length) {
document.addEventListener("DOMContentLoaded", () => {
  function counter(id, start, end, duration) {
   let obj = document.getElementById(id),
    current = start,
    range = end - start,
    increment = end > start ? 1 : -1,
    step = Math.abs(Math.floor(duration / range)),
    timer = setInterval(() => {
     current += increment;
     obj.textContent = current;
     if (current == end) {
      clearInterval(timer);
     }
    }, step);
  }
//   counter("count1", 10, 8, 800);
//   counter("count2", 10, 4, 800);
//   counter("count3", 10, 3, 800);
//   counter("count4", 10, 7, 800);
//   counter("count5", 10, 0, 800);
//   counter("count6", 10, 0, 800);
//   counter("count7", 10, 0, 800);
//   counter("count8", 10, 0, 800);
  let totdos = $("#t_doses").val();
  const myArray = totdos.split("");
  var lngth = myArray.length;

  for(var index = 0; index < lngth; index++){
    counter("count"+index, 10, myArray[index], 1800);
  }
 });
}