// #<{(|-------------------------------------------------------------------------------------------------------------------------------|)}>#
// #<{(|This is main JS file that contains custom style rules used in this template|)}>#
// #<{(|-------------------------------------------------------------------------------------------------------------------------------|)}>#
// #<{(| Template Name: Medison|)}>#
// #<{(| Version: 1.0 Initial Release|)}>#
// #<{(| Build Date: 25-02-2015|)}>#
// #<{(| Author: Volodymyr|)}>#
// #<{(| Copyright: (C) 2015 |)}>#
// #<{(|-------------------------------------------------------------------------------------------------------------------------------|)}>#
//
// #<{(|--------------------------------------------------------|)}>#
// #<{(| TABLE OF CONTENTS: |)}>#
// #<{(|--------------------------------------------------------|)}>#
// #<{(| 01 - VARIABLES |)}>#
// #<{(| 02 - page calculations |)}>#
// #<{(| 03 - function on document ready |)}>#
// #<{(| 04 - function on page load |)}>#
// #<{(| 05 - function on page resize |)}>#
// #<{(| 06 - function on page scroll |)}>#
// #<{(| 07 - swiper sliders |)}>#
// #<{(|-------------------------------------------------------------------------------------------------------------------------------|)}>#
//
// $(function() {
//
//
// 	"use strict";
//
// 	#<{(|================|)}>#
// 	#<{(| 01 - VARIABLES |)}>#
// 	#<{(|================|)}>#
// 	var swipers = [], winW, winH, _isresponsive, xsPoint = 750, smPoint = 974, mdPoint = 1182;
//
// 	var counter_enable = true;
// 	var circliful = true;
// 	var progressbar = true;
//
//
// 	#<{(|========================|)}>#
// 	#<{(| 02 - page calculations |)}>#
// 	#<{(|========================|)}>#
// 	function pageCalculations(){
// 		winW = $(window).width();
// 		winH = $(window).height();
// 	}
//
//
// 	#<{(|=================================|)}>#
// 	#<{(| 03 - function on document ready |)}>#
// 	#<{(|=================================|)}>#
//
// 	//init bootstrap popovers
// 	$('[data-toggle="popover"]').popover();
//
// 	//center all images inside containers
// 	$('.center-image').each(function(){
// 		var bgSrc = $(this).attr('src');
// 		$(this).parent().addClass('background-block').css({'background-image':'url('+bgSrc+')'});
// 		$(this).hide();
// 	});
//
// 	//make last title letter blue
// 	$('.block-header .title, .highlight').each(function(){
// 	  var $this = $(this);
// 	  var sin = $this.html();
// 	  if (sin.length<1) return;
// 	  var sout = sin.substring(0, sin.length-1)+'<span class="blue">'+sin.charAt(sin.length-1)+'</span>';
// 	  $this.html(sout);
// 	});
//
// 	//start counter
// 	$('.stat-block').viewportChecker({
// 		callbackFunction: function(elem, action){
// 				if (counter_enable){
// 					$('.counter').each(function () {
// 					  var $this = $(this);
// 					  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
// 						duration: 1000,
// 						easing: 'swing',
// 						step: function () {
// 						  $this.text(Math.ceil(this.Counter));
// 						}
// 					  });
// 					});
// 					counter_enable = false;
// 				};
// 		}
// 	});
//
// 	//animation blocks
// 	$('.post').viewportChecker({
// 		classToAdd: 'animated',
// 		offset: 100
// 	});
//
// 	//scrollUp
// 	$(function () {
// 		$.scrollUp({
// 			scrollText: ''
// 		});
// 	});
//
//
//
// 	//circliful
// 	$('#myStat').viewportChecker({
// 		callbackFunction: function(elem, action){
// 			if (circliful){
// 				$('#myStat').circliful();
// 				$('#myStat2').circliful();
// 				$('#myStat3').circliful();
// 				$('#myStat4').circliful();
// 			};
// 			circliful = false;
// 		}
// 	});
//
// 	//progress-bar
// 	$('.progress-bar').viewportChecker({
// 		callbackFunction: function(elem, action){
//
// 			if (progressbar){
// 				$('.progress-bar').each(function() {
// 					var me = $(this);
// 					var count = me.find('.count');
// 					var perc = me.attr("data-percentage");
//
// 					//TODO: left and right text handling
//
// 					var current_perc = 0;
//
// 					var progress = setInterval(function() {
// 						if (current_perc>=perc) {
// 							clearInterval(progress);
// 						} else {
// 							current_perc +=1;
// 							me.css('width', (current_perc)+'%');
// 						}
//
// 						count.text((current_perc)+'%');
//
// 					}, 50);
//
// 				});
// 			};
// 			progressbar = false;
// 		}
// 	});
//
// 	//video-icon
// 	$('.video-icon').on('click', function(){
// 		var video = $(this).data('video');
// 		$('.popup-video').show();
// 		$('.popup-video .movie iframe').attr('src',video);
// 			return false;});
//
// 	$('.video-about .close-button').on('click', function(){
// 		$('.popup-video').hide();
// 		$('.popup-video .movie iframe').attr('src','');
// 			return false;});
//
// 	//blog video
// 	$('.blog-video').on('click', function(){
// 		var blog_video = $(this).attr('data-src');
// 		$(this).hide();
// 		$(this).siblings('.popup-video').show();
// 		$(this).siblings('.popup-video').find('.movie iframe').attr('src',blog_video);
// 			return false;});
//
// 	$('.blog-entry .close-button').on('click',function(){
// 		$(this).parent().parent().siblings(".blog-video").show();
// 		$('.popup-video').hide();
// 		$('.popup-video movie iframe').attr('src','');
// 			return false;});
//
// 	//mobile menu
// 	$('#navbar .dropdown-toggle span').on('click', function(){
// 		if ($(this).hasClass('open')){
// 			$(this).removeClass('open').addClass('clouse');
// 			$(this).parent().siblings("ul").hide();
// 			$(this).parent().parent().removeClass('open');
// 			return false;
//
// 		} else {
// 			$(this).removeClass('clouse').addClass('open');
// 			$(this).parent().siblings("ul").show();
// 			$(this).parent().parent().addClass('open');
// 			return false;
// 		}
// 	});
//
//
//
//
//
// 	#<{(|============================|)}>#
// 	#<{(| 04 - function on page load |)}>#
// 	#<{(|============================|)}>#
// 	$(window).load(function(){
// 		$('body').addClass('loaded');
// 		pageCalculations();
// 		initSwiper();
// 		$('#loader-wrapper').fadeOut(500);
// 		$('body,html').animate({'scrollTop':'0px'},2)
//
// 		//masonry
// 		if ($('.masonry-container').length) {
// 		   var $container = $('.masonry-container').isotope({
//
// 					itemSelector: '.item',
// 					layoutMode: 'masonry',
// 					masonry: {
// 					  columnWidth: '.grid-sizer'
// 					}
// 				  });
// 		}
// 	});
//
//
// 	#<{(|==============================|)}>#
// 	#<{(| 05 - function on page resize |)}>#
// 	#<{(|==============================|)}>#
// 	function resizeCall(){
// 		pageCalculations();
// 		$('.swiper-container').each(function(){
// 			swipers['swiper-'+$(this).attr('id')].reInit();
// 		});
// 	}
// 	$(window).resize(function(){
// 		resizeCall();
// 	});
// 	window.addEventListener("orientationchange", function() {
// 		resizeCall();
// 	}, false);
//
//
// 	#<{(|==============================|)}>#
// 	#<{(| 06 - function on page scroll |)}>#
// 	#<{(|==============================|)}>#
// 	$(window).scroll(function(){
// 		if($('body').hasClass('header-moved') && !_isresponsive) if($(window).scrollTop()>=36) $('header').addClass('fixed-top');
// 		else $('header').removeClass('fixed-top');
// 	});
// });

$(function() {
    var swiper = new Swiper('.swiper-container',
    {
        spaceBetween: 35,
        effect: 'fade',
        autoplay: 5000,
        loop: true,
    });
});
